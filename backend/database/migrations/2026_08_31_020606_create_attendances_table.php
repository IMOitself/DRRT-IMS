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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete();
            $table->foreignId('recorder_id')->nullable()->constrained('users');
            $table->enum('status', ['present', 'absent', 'late'])->nullable();
            $table->longText('proof_of_attendance')->nullable();
            $table->text('absent_reason')->nullable();
            $table->longText('absent_supporting_image')->nullable();
            $table->text('late_reason')->nullable();
            $table->longText('late_supporting_image')->nullable();
            $table->string('timein_hour')->nullable();
            $table->string('timein_minute')->nullable();
            $table->string('timein_ampm', 2)->nullable();
            $table->boolean('correction_requested')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
