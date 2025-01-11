<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Article;
use Illuminate\Support\Facades\Log;

class ArticlePolicy
{
	// List articles
	public function retrieveArticles(User $user): bool
	{
		Log::info('ArticlePolicy@retrieveArticles', User::all()->toArray());
		return in_array($user->type, ['Writer', 'Editor']);
	}

	// View specific article
	public function view(User $user, Article $article): bool
	{
		return in_array($user->type, ['Writer', 'Editor']);
	}

	// Create article (Writer and Editor)
	public function create(User $user): bool
	{
		return in_array($user->type, ['Writer', 'Editor']);
	}

	// Edit article
	public function update(User $user, Article $article): bool
	{
		if ($user->type === 'Editor') {
			return true;
		}

		// Writers can only edit their own unpublished articles
		return $user->type === 'Writer'
			&& $article->writer_id === $user->id
			&& $article->status === 'For Edit';
	}

	// Publish article (Editor only)
	public function publish(User $user, Article $article): bool
	{
		return $user->type === 'Editor';
	}

	// Delete article (Editor only)
	public function delete(User $user, Article $article): bool
	{
		return $user->type === 'Editor';
	}
}
