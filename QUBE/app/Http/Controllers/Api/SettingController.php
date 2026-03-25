<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'phone1' => Setting::get('phone1', ''),
                'phone2' => Setting::get('phone2', ''),
                'whatsapp' => Setting::get('whatsapp', ''),
                'email' => Setting::get('email', ''),
                'address_en' => Setting::get('address_en', ''),
                'address_ar' => Setting::get('address_ar', ''),
            ],
        ]);
    }
}
