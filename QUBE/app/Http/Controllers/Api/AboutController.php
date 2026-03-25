<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\JsonResponse;

class AboutController extends Controller
{
    public function index(): JsonResponse
    {
        $about = About::first();

        if (!$about) {
            return response()->json([
                'success' => true,
                'data' => null,
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $about->id,
                'title_en' => $about->title_en,
                'title_ar' => $about->title_ar,
                'description_en' => $about->description_en,
                'description_ar' => $about->description_ar,
            ],
        ]);
    }
}
