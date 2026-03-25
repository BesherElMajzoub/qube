<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::query();

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('featured')) {
            $query->where('featured', true);
        }

        if ($request->has('search')) {
            $query->search($request->search);
        }

        $products = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name_en,
                    'nameAr' => $product->name_ar,
                    'description' => $product->description_en,
                    'descriptionAr' => $product->description_ar,
                    'category' => $product->category,
                    'imageUrl' => $product->image ? asset('storage/' . $product->image) : null,
                    'price' => $product->price,
                    'featured' => $product->featured ? 1 : 0,
                    'createdAt' => $product->created_at,
                    'updatedAt' => $product->updated_at,
                ];
            }),
        ]);
    }

    public function show(Product $product): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $product->id,
                'name' => $product->name_en,
                'nameAr' => $product->name_ar,
                'description' => $product->description_en,
                'descriptionAr' => $product->description_ar,
                'category' => $product->category,
                'imageUrl' => $product->image ? asset('storage/' . $product->image) : null,
                'price' => $product->price,
                'featured' => $product->featured ? 1 : 0,
                'createdAt' => $product->created_at,
                'updatedAt' => $product->updated_at,
            ],
        ]);
    }
}
