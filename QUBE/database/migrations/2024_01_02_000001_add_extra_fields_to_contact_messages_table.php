<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->string('project_type')->nullable()->after('message');
            $table->string('measurements')->nullable()->after('project_type');
            $table->string('preferred_color')->nullable()->after('measurements');
        });
    }

    public function down(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->dropColumn(['project_type', 'measurements', 'preferred_color']);
        });
    }
};
