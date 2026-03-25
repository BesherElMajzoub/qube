<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Project;
use App\Models\ContactMessage;
use App\Models\Visitor;
use App\Models\Click;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        $stats = [
            'visitors_today' => Visitor::whereDate('visited_at', $today)->count(),
            'clicks_today' => Click::whereDate('date', $today)->sum('count'),
            'total_products' => Product::count(),
            'total_projects' => Project::count(),
            'total_messages' => ContactMessage::count(),
            'unread_messages' => ContactMessage::where('status', 'new')->count(),
        ];

        $recent_messages = ContactMessage::where('status', 'new')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return view('admin.dashboard', compact('stats', 'recent_messages'));
    }
}
