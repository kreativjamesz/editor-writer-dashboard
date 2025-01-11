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
	Route::get('/articles', 							[ArticleController::class, 'index'])->middleware('can:retrieve-articles');
	Route::post('/articles', 							[ArticleController::class, 'store'])->middleware('can:create-article');
	Route::get('/articles/{article}', 		[ArticleController::class, 'show'])->middleware('can:view-article,article');
	Route::put('/articles/{article}', 		[ArticleController::class, 'update'])->middleware('can:update-article,article');
	Route::delete('/articles/{article}', 	[ArticleController::class, 'destroy'])->middleware('can:delete-article,article');

	// Companies
	Route::get('/companies', 							[CompanyController::class, 'index'])->middleware('can:retrieve-companies');
	Route::post('/companies',	 						[CompanyController::class, 'store'])->middleware('can:create-company');
	Route::get('/companies/{company}', 		[CompanyController::class, 'show'])->middleware('can:view-company,company');
	Route::put('/companies/{company}', 		[CompanyController::class, 'update'])->middleware('can:update-company,company');
	Route::delete('/companies/{company}', [CompanyController::class, 'destroy'])->middleware('can:delete-company,company');

	// Users
	Route::get('/users', 									[UserController::class, 'index'])->middleware('can:retrieve-users');
	Route::post('/users', 								[UserController::class, 'store'])->middleware('can:create-user');
	Route::get('/users/{user}', 					[UserController::class, 'show'])->middleware('can:view-user,user');
	Route::put('/users/{user}', 					[UserController::class, 'update'])->middleware('can:update-user,user');
	Route::delete('/users/{user}', 				[UserController::class, 'destroy'])->middleware('can:delete-user,user');
});
