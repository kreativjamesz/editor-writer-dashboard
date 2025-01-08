<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
	use HasFactory;

	protected $fillable = [
		'logo',
		'name',
		'status',
	];

	public function articles(): HasMany
	{
		return $this->hasMany(Article::class);
	}
}
