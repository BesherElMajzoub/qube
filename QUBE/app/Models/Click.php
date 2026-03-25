<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Click extends Model
{
    protected $fillable = [
        'element',
        'count',
        'date',
    ];

    protected $casts = [
        'date' => 'date',
    ];
}
