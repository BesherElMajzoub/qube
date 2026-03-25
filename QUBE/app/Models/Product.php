<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name_en',
        'name_ar',
        'description_en',
        'description_ar',
        'category',
        'image',
        'price',
        'featured',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function scopeSearch($query, $search)
    {
        if ($search) {
            return $query->where('name_en', 'like', "%{$search}%")
                ->orWhere('name_ar', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%");
        }
        return $query;
    }
}
