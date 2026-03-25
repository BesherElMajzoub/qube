<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Visitor;
use App\Models\Click;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:255',
            'phone' => 'required|string|min:7|max:20',
            'email' => 'nullable|email|max:320',
            'message' => 'required|string|min:10',
        ]);

        ContactMessage::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent successfully',
        ], 201);
    }

    public function trackVisitor(Request $request): JsonResponse
    {
        $ip = $request->ip();
        $today = now()->toDateString();

        // Only track unique IP per day
        Visitor::firstOrCreate([
            'ip_address' => $ip,
            'visited_at' => $today,
        ]);

        return response()->json(['success' => true]);
    }

    public function trackClick(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'element' => 'nullable|string|max:100',
        ]);

        $today = now()->toDateString();

        $click = Click::firstOrCreate(
            ['date' => $today, 'element' => $validated['element'] ?? 'general'],
            ['count' => 0]
        );

        $click->increment('count');

        return response()->json(['success' => true]);
    }
}
