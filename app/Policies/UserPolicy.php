<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
	// List all users (Editor only)
	public function retrieveUsers(User $user): bool
	{
		return $user->type === 'Editor';
	}

	// View specific user details (Editor only)
	public function view(User $user, User $targetUser): bool
	{
		return $user->type === 'Editor';
	}

	// Create new user (Editor only)
	public function create(User $user): bool
	{
		return $user->type === 'Editor';
	}

	// Edit user (Editor only)
	public function update(User $user, User $targetUser): bool
	{
		return $user->type === 'Editor';
	}

	// Delete user (Editor only)
	public function delete(User $user, User $targetUser): bool
	{
		return $user->type === 'Editor';
	}
}
