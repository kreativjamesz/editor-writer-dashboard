<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
	public function index(Request $request)
	{
		$query = Article::with(['writer', 'editor', 'company']);

		if ($request->has('status')) {
			$query->where('status', $request->status);
		}

		if ($request->user()->type === 'Writer') {
			$query->where('writer_id', $request->user()->id)
				->whereIn('status', ['For Edit', 'Published']);
		}

		$articles = $query->latest()->paginate(
			$request->input('per_page', 10)
		);

		return ArticleResource::collection($articles);
	}

	public function store(Request $request)
	{
		$validated = $request->validate([
			'company_id' => 'required|exists:companies,id',
			'image' => 'required|image|max:2048', // 2MB max
			'title' => 'required|string|max:255',
			'link' => 'required|url|max:255',
			'published_date' => 'required|date',
			'content' => 'required|string',
		]);

		// Handle image upload
		$path = $request->file('image')->store('articles', 'public');

		$article = Article::create([
			...$validated,
			'image' => Storage::url($path),
			'writer_id' => $request->user()->id,
			'status' => 'For Edit',
		]);

		return response()->json($article->load(['writer', 'company']));
	}

	public function show(Article $article)
	{
		return response()->json($article->load(['writer', 'editor', 'company']));
	}

	public function update(Request $request, Article $article)
	{
		// Check if user can edit the article
		if (
			$request->user()->type === 'Writer' &&
			($article->status !== 'For Edit' || $article->writer_id !== $request->user()->id)
		) {
			return response()->json(['message' => 'Unauthorized'], 403);
		}

		$validated = $request->validate([
			'company_id' => 'sometimes|exists:companies,id',
			'image' => 'sometimes|image|max:2048',
			'title' => 'sometimes|string|max:255',
			'link' => 'sometimes|url|max:255',
			'published_date' => 'sometimes|date',
			'content' => 'sometimes|string',
		]);

		// Handle image upload if new image is provided
		if ($request->hasFile('image')) {
			$path = $request->file('image')->store('articles', 'public');
			$validated['image'] = Storage::url($path);
		}

		// Handle publish action for editors
		if ($request->user()->type === 'Editor' && $request->input('publish')) {
			$validated['status'] = 'Published';
			$validated['editor_id'] = $request->user()->id;
		}

		$article->update($validated);

		return response()->json($article->load(['writer', 'editor', 'company']));
	}

	public function destroy(Article $article)
	{
		// Only editors can delete articles
		if (auth()->user()->type !== 'Editor') {
			return response()->json(['message' => 'Unauthorized'], 403);
		}

		$article->delete();
		return response()->json(['message' => 'Article deleted successfully']);
	}
}
