<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
	Route::post('/logout', [AuthController::class, 'logout']);
	Route::get('/user', [AuthController::class, 'user']);

	// Articles
	Route::apiResource('articles', ArticleController::class);

	// Companies (Editor only)
	Route::middleware('can:manage-companies')->group(function () {
		Route::apiResource('companies', CompanyController::class);
	});

	// Users (Editor only)
	Route::middleware('can:manage-users')->group(function () {
		Route::apiResource('users', UserController::class);
	});
});
