<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
	public function __construct()
	{
		$this->middleware('can:manage-users');
	}

	public function index()
	{
		return response()->json(User::all());
	}

	public function store(Request $request)
	{
		$validated = $request->validate([
			'firstname' => 'required|string|max:255',
			'lastname' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => ['required', Password::defaults()],
			'type' => 'required|in:Writer,Editor',
			'status' => 'required|in:Active,Inactive',
		]);

		$user = User::create([
			...$validated,
			'password' => Hash::make($validated['password']),
		]);

		return response()->json($user);
	}

	public function show(User $user)
	{
		return response()->json($user);
	}

	public function update(Request $request, User $user)
	{
		$validated = $request->validate([
			'firstname' => 'sometimes|string|max:255',
			'lastname' => 'sometimes|string|max:255',
			'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
			'password' => ['sometimes', Password::defaults()],
			'type' => 'sometimes|in:Writer,Editor',
			'status' => 'sometimes|in:Active,Inactive',
		]);

		if (isset($validated['password'])) {
			$validated['password'] = Hash::make($validated['password']);
		}

		$user->update($validated);
		return response()->json($user);
	}

	public function destroy(User $user)
	{
		// Check if user has any articles
		if ($user->writtenArticles()->exists() || $user->editedArticles()->exists()) {
			return response()->json([
				'message' => 'Cannot delete user with existing articles'
			], 422);
		}

		$user->delete();
		return response()->json(['message' => 'User deleted successfully']);
	}
}
