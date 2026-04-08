<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'message',
        'project_type',
        'measurements',
        'preferred_color',
        'status',
    ];
}
