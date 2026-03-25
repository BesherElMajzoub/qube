<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Project::with('images');

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('featured')) {
            $query->where('featured', true);
        }

        if ($request->has('search')) {
            $query->search($request->search);
        }

        $projects = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $projects->map(function ($project) {
                $images = $project->images;
                return [
                    'id' => $project->id,
                    'title' => $project->title_en,
                    'titleAr' => $project->title_ar,
                    'description' => $project->description_en,
                    'descriptionAr' => $project->description_ar,
                    'category' => $project->category,
                    'beforeImageUrl' => $images->first() ? asset('storage/' . $images->first()->image_path) : null,
                    'afterImageUrl' => $images->count() > 1 ? asset('storage/' . $images->skip(1)->first()->image_path) : null,
                    'images' => $images->map(fn($img) => asset('storage/' . $img->image_path)),
                    'caseStudy' => $project->case_study_en,
                    'caseStudyAr' => $project->case_study_ar,
                    'featured' => $project->featured ? 1 : 0,
                    'createdAt' => $project->created_at,
                    'updatedAt' => $project->updated_at,
                ];
            }),
        ]);
    }

    public function show(Project $project): JsonResponse
    {
        $project->load('images');
        $images = $project->images;

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $project->id,
                'title' => $project->title_en,
                'titleAr' => $project->title_ar,
                'description' => $project->description_en,
                'descriptionAr' => $project->description_ar,
                'category' => $project->category,
                'beforeImageUrl' => $images->first() ? asset('storage/' . $images->first()->image_path) : null,
                'afterImageUrl' => $images->count() > 1 ? asset('storage/' . $images->skip(1)->first()->image_path) : null,
                'images' => $images->map(fn($img) => asset('storage/' . $img->image_path)),
                'caseStudy' => $project->case_study_en,
                'caseStudyAr' => $project->case_study_ar,
                'featured' => $project->featured ? 1 : 0,
                'createdAt' => $project->created_at,
                'updatedAt' => $project->updated_at,
            ],
        ]);
    }
}
