<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $settings = [
            'phone1' => Setting::get('phone1', ''),
            'phone2' => Setting::get('phone2', ''),
            'whatsapp' => Setting::get('whatsapp', ''),
            'email' => Setting::get('email', ''),
            'address_en' => Setting::get('address_en', ''),
            'address_ar' => Setting::get('address_ar', ''),
        ];

        return view('admin.settings.index', compact('settings'));
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'phone1' => 'nullable|string|max:20',
            'phone2' => 'nullable|string|max:20',
            'whatsapp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address_en' => 'nullable|string|max:500',
            'address_ar' => 'nullable|string|max:500',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings updated successfully!');
    }
}
