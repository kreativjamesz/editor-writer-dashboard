<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
	use HasApiTokens, HasFactory, Notifiable;

	protected $fillable = [
		'firstname',
		'lastname',
		'email',
		'password',
		'type',
		'status',
	];

	protected $hidden = [
		'password',
		'remember_token',
	];

	protected $casts = [
		'email_verified_at' => 'datetime',
		'password' => 'hashed',
	];

	public function writtenArticles(): HasMany
	{
		return $this->hasMany(Article::class, 'writer_id');
	}

	public function editedArticles(): HasMany
	{
		return $this->hasMany(Article::class, 'editor_id');
	}
}
