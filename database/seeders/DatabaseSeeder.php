<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
	public function run(): void
	{
		// Create Editor User
		User::create([
			'firstname' => 'John',
			'lastname' => 'Editor',
			'email' => 'editor@example.com',
			'password' => Hash::make('123123123'),
			'type' => 'Editor',
			'status' => 'Active',
		]);

		// Create Writer User
		User::create([
			'firstname' => 'Jane',
			'lastname' => 'Writer',
			'email' => 'writer@example.com',
			'password' => Hash::make('123123123'),
			'type' => 'Writer',
			'status' => 'Active',
		]);

		// Create some additional test users
		User::create([
			'firstname' => 'Alice',
			'lastname' => 'Editor',
			'email' => 'alice@example.com',
			'password' => Hash::make('123123123'),
			'type' => 'Editor',
			'status' => 'Active',
		]);

		User::create([
			'firstname' => 'Bob',
			'lastname' => 'Writer',
			'email' => 'bob@example.com',
			'password' => Hash::make('123123123'),
			'type' => 'Writer',
			'status' => 'Active',
		]);

		// Create an inactive user for testing
		User::create([
			'firstname' => 'Inactive',
			'lastname' => 'User',
			'email' => 'inactive@example.com',
			'password' => Hash::make('123123123'),
			'type' => 'Writer',
			'status' => 'Inactive',
		]);

		$this->call([
			CompanySeeder::class,
			ArticleSeeder::class
		]);
	}
}
