<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // graduated keeps the application instead of deleting it, so it can be unmarked later
        Schema::table('membership_applications', function (Blueprint $table) {
            $table->enum('status', ['pending', 'approved_need_register', 'approved_member_now', 'graduated'])->default('pending')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('membership_applications')->where('status', 'graduated')->update(['status' => 'approved_member_now']);

        Schema::table('membership_applications', function (Blueprint $table) {
            $table->enum('status', ['pending', 'approved_need_register', 'approved_member_now'])->default('pending')->change();
        });
    }
};
