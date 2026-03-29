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
                'phone1' => Setting::get('phone1', '0966357000'),
                'phone2' => Setting::get('phone2', '0944357001'),
                'mobile' => Setting::get('mobile', '963944357001'),
                'whatsapp' => Setting::get('whatsapp', '+963944357001'),
                'email' => Setting::get('email', 'lg.hausys.syria.1@gmail.com'),
                'address_en' => Setting::get('address_en', 'Sahnaya, Saj Complex, 1st Floor'),
                'address_ar' => Setting::get('address_ar', 'صحنايا مجمع الصاج ط١'),
            ],
        ]);
    }
}
