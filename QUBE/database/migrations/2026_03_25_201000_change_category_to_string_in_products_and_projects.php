<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Change products.category from ENUM to VARCHAR
        DB::statement("ALTER TABLE `products` MODIFY `category` VARCHAR(255) NOT NULL DEFAULT 'marble'");

        // Change projects.category from ENUM to VARCHAR
        DB::statement("ALTER TABLE `projects` MODIFY `category` VARCHAR(255) NOT NULL DEFAULT 'residential'");
    }

    public function down(): void
    {
        // Revert products.category back to ENUM (existing data may not match — use with caution)
        DB::statement("ALTER TABLE `products` MODIFY `category` ENUM('marble','wood','engineered') NOT NULL DEFAULT 'marble'");

        // Revert projects.category back to ENUM
        DB::statement("ALTER TABLE `projects` MODIFY `category` ENUM('residential','commercial') NOT NULL DEFAULT 'residential'");
    }
};
