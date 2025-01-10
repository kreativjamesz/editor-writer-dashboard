<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Company;

class CompanyPolicy
{
	// List companies (both Writer and Editor)
	public function retrieveCompanies(User $user): bool
	{
		\Log::info('CompanyPolicy@retrieveCompanies', [
			'user_type' => $user->type,
			'user_id' => $user->id
		]);

		return in_array($user->type, ['Writer', 'Editor']);
	}

	// View specific company details
	public function view(User $user, Company $company): bool
	{
		return in_array($user->type, ['Writer', 'Editor']);
	}

	// Create new company (Editor only)
	public function create(User $user): bool
	{
		return $user->type === 'Editor';
	}

	// Edit company (Editor only)
	public function update(User $user, Company $company): bool
	{
		return $user->type === 'Editor';
	}

	// Delete company (Editor only)
	public function delete(User $user, Company $company): bool
	{
		return $user->type === 'Editor';
	}
}
