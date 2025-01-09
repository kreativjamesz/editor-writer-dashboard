<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray(Request $request): array
	{
		// return parent::toArray($request);

		return [
			'id' => $this->id,
			'title' => $this->title,
			'image' => $this->image,
			'link' => $this->link,
			'content' => $this->content,
			'published_date' => $this->published_date,
			'status' => $this->status,
			'writer_id' => $this->writer_id,
			'editor_id' => $this->editor_id,
			'company_id' => $this->company_id
		];
	}
}
