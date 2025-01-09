<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	public function up(): void
	{
		Schema::create('articles', function (Blueprint $table) {
			$table->id();
			$table->string('image');
			$table->string('title');
			$table->string('link');
			$table->date('published_date')->nullable();
			$table->text('content');
			$table->enum('status', ['For Edit', 'Published']);
			$table->foreignId('writer_id')->constrained('users');
			$table->foreignId('editor_id')->nullable()->constrained('users');
			$table->foreignId('company_id')->constrained('companies');
			$table->timestamps();
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('articles');
	}
};
