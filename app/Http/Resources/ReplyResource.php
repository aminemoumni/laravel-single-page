<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ReplyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'=> $this->id,
            'reply' => $this->body,
            'user' => $this->user->name,
            'user_id' => $this->user->id,
            'like_count' => $this->likes->count(),
            'liked' => !!$this->likes->where('user_id', Auth::user()->id)->count(),
            'question_slug' => $this->question->slug,
            'created_at' => $this->created_at->diffForHumans()

        ];
    }
}
