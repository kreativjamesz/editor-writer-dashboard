<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		return [
			'logo' => 'https://archintel.com/wp-content/uploads/2019/10/archintel-logo.gif',
			'name' => $this->faker->company(),
			'status' => $this->faker->randomElement(['Active', 'Inactive']),
		];
	}
}
