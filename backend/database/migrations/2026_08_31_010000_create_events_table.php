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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description')->nullable();
            $table->enum('type', ['drill', 'meeting', 'deployment', 'others'])->nullable();
            $table->string('date')->nullable();
            $table->string('time_hour')->nullable();
            $table->string('time_minute')->nullable();
            $table->string('time_ampm', 2)->nullable();
            $table->string('participants')->nullable();
            $table->enum('venue_online', ['zoom', 'gmeet'])->nullable();
            $table->string('venue_facetoface')->nullable();
            $table->boolean('require_proof_of_attendance')->default(false);
            $table->boolean('pending_approval')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
