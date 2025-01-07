<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
	return $request->user();
})->middleware('auth:sanctum');

Route::get('/', function () {
	$sampleObject = [
		[
			'path' => '/',
			'name' => 'Home',
			'component' => 'HomeComponent'
		],
		[
			'path' => '/about',
			'name' => 'About',
			'component' => 'AboutComponent'
		],
		[
			'path' => '/contact',
			'name' => 'Contact',
			'component' => 'ContactComponent'
		]
	];
	return $sampleObject;
});
