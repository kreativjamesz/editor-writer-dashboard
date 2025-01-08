<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Article extends Model
{
	use HasFactory;

	protected $fillable = [
		'image',
		'title',
		'link',
		'date',
		'content',
		'status',
		'writer_id',
		'editor_id',
		'company_id',
	];

	protected $casts = [
		'date' => 'date',
	];

	public function writer(): BelongsTo
	{
		return $this->belongsTo(User::class, 'writer_id');
	}

	public function editor(): BelongsTo
	{
		return $this->belongsTo(User::class, 'editor_id');
	}

	public function company(): BelongsTo
	{
		return $this->belongsTo(Company::class);
	}
}
