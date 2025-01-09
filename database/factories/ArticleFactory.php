<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		$status = $this->faker->randomElement(['For Edit', 'Published']);
		$editorId = $status === 'Published' ? User::where('type', 'Editor')->inRandomOrder()->first()->id : null;
		$publishedDate = $status === 'Published' ? $this->faker->date() : null;

		// Find a user who is a writer
		$writerId = User::where('type', 'Writer')->inRandomOrder()->first()->id;

		return [
			'image' => $this->faker->imageUrl(),
			'title' => $this->faker->sentence(),
			'link' => $this->faker->url(),
			'published_date' => $publishedDate,
			'content' => $this->faker->paragraph(),
			'status' => $status,
			'writer_id' => $writerId,
			'editor_id' => $editorId,
			'company_id' => \App\Models\Company::factory(),
		];
	}
}
