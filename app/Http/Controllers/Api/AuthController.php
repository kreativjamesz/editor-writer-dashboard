<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
	public function login(Request $request)
	{
		$credentials = $request->validate([
			'email' => ['required', 'email'],
			'password' => ['required'],
		]);

		if (!Auth::attempt($credentials)) {
			throw ValidationException::withMessages([
				'email' => ['The provided credentials are incorrect.'],
			]);
		}

		$user = User::where('email', $request->email)->first();

		if ($user->status !== 'Active') {
			throw ValidationException::withMessages([
				'email' => ['This account is inactive.'],
			]);
		}

		return response()->json([
			'token' => $user->createToken('auth-token')->plainTextToken,
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
