<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'title', 'slug', 'body', 'category_id','user_id'
    ];
    protected $with = ['replies'];
    public function getRouteKeyName()
    {
        return 'slug';
    }
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    public function category()
    {
        return $this->belongsTo('App\Category');
    }

    public function replies()
    {
        return $this->hasMany('App\Reply')->latest();
    }

    public function getPathAttribute()
    {
        return "/question/$this->slug";
    }
}
