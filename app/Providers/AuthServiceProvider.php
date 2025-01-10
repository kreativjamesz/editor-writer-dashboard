<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Models\Company;
use App\Models\Article;
use App\Policies\UserPolicy;
use App\Policies\CompanyPolicy;
use App\Policies\ArticlePolicy;

class AuthServiceProvider extends ServiceProvider
{
	protected $policies = [
		User::class => UserPolicy::class,
		Company::class => CompanyPolicy::class,
		Article::class => ArticlePolicy::class,
	];

	public function boot(): void
	{
		// Company permissions
		Gate::define('retrieve-companies', [CompanyPolicy::class, 'retrieveCompanies']);
		Gate::define('view-company', [CompanyPolicy::class, 'view']);
		Gate::define('create-company', [CompanyPolicy::class, 'create']);
		Gate::define('update-company', [CompanyPolicy::class, 'update']);
		Gate::define('delete-company', [CompanyPolicy::class, 'delete']);

		// User permissions
		Gate::define('retrieve-users', [UserPolicy::class, 'retrieveUsers']);
		Gate::define('view-user', [UserPolicy::class, 'view']);
		Gate::define('create-user', [UserPolicy::class, 'create']);
		Gate::define('update-user', [UserPolicy::class, 'update']);
		Gate::define('delete-user', [UserPolicy::class, 'delete']);

		// Article permissions
		Gate::define('retrieve-articles', [ArticlePolicy::class, 'retrieveArticles']);
		Gate::define('view-article', [ArticlePolicy::class, 'view']);
		Gate::define('create-article', [ArticlePolicy::class, 'create']);
		Gate::define('update-article', [ArticlePolicy::class, 'update']);
		Gate::define('publish-article', [ArticlePolicy::class, 'publish']);
		Gate::define('delete-article', [ArticlePolicy::class, 'delete']);
	}
}
