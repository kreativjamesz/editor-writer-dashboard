<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Models\Company;
use App\Policies\UserPolicy;
use App\Policies\CompanyPolicy;

class AuthServiceProvider extends ServiceProvider
{
	protected $policies = [
		User::class => UserPolicy::class,
		Company::class => CompanyPolicy::class,
	];

	public function boot(): void
	{
		Gate::define('manage-users', [UserPolicy::class, 'manageUsers']);
		Gate::define('manage-companies', [CompanyPolicy::class, 'manageCompanies']);
	}
}
