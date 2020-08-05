<?php

namespace App;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected static function boot()
    {
        parent::boot();
        static::creating(function($reply){
            $reply->user_id = Auth::user()->id;
        });
    }
    
    protected $guarded = [];
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function question()
    {
        return $this->belongsTo('App\Question');
    }


    public function likes()
    {
        return $this->hasMany('App\Like');
    }
}
