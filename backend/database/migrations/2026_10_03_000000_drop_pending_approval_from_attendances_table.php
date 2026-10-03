<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // officers see the proof of attendance, so a member's own attendance no longer needs approving
        Schema::table('attendances', function (Blueprint $table) {
            $table->dropColumn('pending_approval');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendances', function (Blueprint $table) {
            $table->boolean('pending_approval')->default(false);
        });
    }
};
