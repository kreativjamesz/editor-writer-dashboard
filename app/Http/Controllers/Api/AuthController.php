<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
	public function login(Request $request)
	{
		$credentials = $request->validate([
			'email' => ['required', 'email'],
			'password' => ['required'],
		]);

		$user = User::where('email', $credentials['email'])->first();

		if (!$user || !Hash::check($credentials['password'], $user->password)) {
			throw ValidationException::withMessages([
				'email' => ['The provided credentials are incorrect.'],
			]);
		}

		if ($user->status !== 'Active') {
			throw ValidationException::withMessages([
				'email' => ['This account is inactive.'],
			]);
		}

		// Create a token for the user
		$token = $user->createToken('auth-token')->plainTextToken;

		return response()->json([
			'token' => $token,
			'user' => $user,
		]);
	}

	public function logout(Request $request)
	{
		$request->user()->currentAccessToken()->delete();
		return response()->json(['message' => 'Logged out successfully']);
	}

	public function user(Request $request)
	{
		return response()->json($request->user());
	}
}
