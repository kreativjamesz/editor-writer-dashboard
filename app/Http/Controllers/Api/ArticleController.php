<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
	public function __construct()
	{
		// No middleware here - we'll use policy middleware in routes
	}

	// Retrieve articles (both Writer and Editor)
	public function index(Request $request)
	{
		$query = Article::with(['writer', 'editor', 'company']);

		if ($request->has('status')) {
			$query->where('status', $request->status);
		}

		// Writers can only see their own articles
		if ($request->user()->type === 'Writer') {
			$query->where('writer_id', $request->user()->id);
		}

		$articles = $query->latest()->paginate(
			$request->input('per_page', 10)
		);

		return ArticleResource::collection($articles);
	}

	// View specific article (both Writer and Editor)
	public function show(Article $article)
	{
		return new ArticleResource($article->load(['writer', 'editor', 'company']));
	}

	// Create article (Writer and Editor)
	public function store(Request $request)
	{
		$validated = $request->validate([
			'company_id' => 'required|exists:companies,id',
			'title' => 'required|string|max:255',
			'image' => 'required|image|max:2048',
			'link' => 'required|url|max:255',
			'published_date' => 'required|date',
			'content' => 'required|string',
		]);

		// Handle image upload
		$path = $request->file('image')->store('articles', 'public');
		$validated['image'] = Storage::url($path);

		// Set default values
		$validated['writer_id'] = $request->user()->id;
		$validated['status'] = 'For Edit';

		$article = Article::create($validated);
		return new ArticleResource($article->load(['writer', 'editor', 'company']));
	}

	// Update article (Writer: own unpublished, Editor: all)
	public function update(Request $request, Article $article)
	{
		$validated = $request->validate([
			'company_id' => 'sometimes|exists:companies,id',
			'title' => 'sometimes|string|max:255',
			'image' => 'sometimes|image|max:2048',
			'link' => 'sometimes|url|max:255',
			'published_date' => 'sometimes|date',
			'content' => 'sometimes|string',
		]);

		if ($request->hasFile('image')) {
			// Delete old image
			if ($article->image) {
				Storage::delete(str_replace('/storage/', 'public/', $article->image));
			}
			// Store new image
			$path = $request->file('image')->store('articles', 'public');
			$validated['image'] = Storage::url($path);
		}

		// Handle publishing (Editor only)
		if ($request->user()->type === 'Editor' && $request->input('publish')) {
			$validated['status'] = 'Published';
			$validated['editor_id'] = $request->user()->id;
		}

		$article->update($validated);
		return new ArticleResource($article->load(['writer', 'editor', 'company']));
	}

	// Delete article (Editor only)
	public function destroy(Article $article)
	{
		// Delete article image if exists
		if ($article->image) {
			Storage::delete(str_replace('/storage/', 'public/', $article->image));
		}

		$article->delete();
		return response()->json(['message' => 'Article deleted successfully']);
	}
}
