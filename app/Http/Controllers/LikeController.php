<?php

namespace App\Http\Controllers;

use App\Like;
use App\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('JWT');
    }
    public function LikeIt(Reply $reply)
    {
        $reply->likes()->create([
            'user_id' => Auth::user()->id
            ]);
    }
    public function unlikeIt(Reply $reply)
    {
        $reply->likes()->where(
            'user_id', Auth::user()->id
        )->first()->delete();
    }
}
