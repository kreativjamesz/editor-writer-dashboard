<?php

namespace App\Policies;

use App\Models\User;

class CompanyPolicy
{
	public function manageCompanies(User $user): bool
	{
		return $user->type === 'Editor';
	}
}
