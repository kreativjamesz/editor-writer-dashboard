<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
	public function manageUsers(User $user): bool
	{
		return $user->type === 'Editor';
	}
}
