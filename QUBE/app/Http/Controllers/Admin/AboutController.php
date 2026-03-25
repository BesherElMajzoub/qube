<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index()
    {
        $about = About::first();

        if (!$about) {
            $about = About::create([
                'title_en' => 'About QUBE',
                'title_ar' => 'عن كيوب',
                'description_en' => '',
                'description_ar' => '',
            ]);
        }

        return view('admin.about.index', compact('about'));
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'description_en' => 'nullable|string',
            'description_ar' => 'nullable|string',
        ]);

        $about = About::first();

        if ($about) {
            $about->update($validated);
        } else {
            About::create($validated);
        }

        return redirect()->route('admin.about.index')
            ->with('success', 'About section updated successfully!');
    }
}
