<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\AboutController;

/*
|--------------------------------------------------------------------------
| API Routes for React Website Integration
|--------------------------------------------------------------------------
*/

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Projects
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

// Categories
Route::get('/categories', [\App\Http\Controllers\Api\CategoryController::class, 'index']);

// Contact
Route::post('/contact', [ContactController::class, 'store']);

// Visitor & Click tracking
Route::post('/track/visitor', [ContactController::class, 'trackVisitor']);
Route::post('/track/click', [ContactController::class, 'trackClick']);

// Settings (public)
Route::get('/settings', [SettingController::class, 'index']);

// About (public)
Route::get('/about', [AboutController::class, 'index']);
