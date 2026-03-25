<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'title_en',
        'title_ar',
        'description_en',
        'description_ar',
        'category',
        'featured',
        'case_study_en',
        'case_study_ar',
    ];

    protected $casts = [
        'featured' => 'boolean',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)->orderBy('sort_order');
    }

    public function scopeSearch($query, $search)
    {
        if ($search) {
            return $query->where('title_en', 'like', "%{$search}%")
                ->orWhere('title_ar', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%");
        }
        return $query;
    }
}
