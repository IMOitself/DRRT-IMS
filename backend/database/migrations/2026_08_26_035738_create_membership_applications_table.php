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
        Schema::create('membership_applications', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['pending', 'approved_need_register', 'approved_member_now', 'graduated'])->default('pending');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->foreignId('reviewer_id')->nullable()->constrained('users');
            $table->timestamp('date_applied')->useCurrent();
            $table->string('student_id');
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->enum('course', ['BSIS', 'BSA', 'BSAIS', 'BSSW', 'BAB', 'ACT']);
            $table->integer('year_level');
            $table->string('email');
            $table->string('phone_number', 20);
            $table->string('emergency_person_name');
            $table->string('emergency_phone', 20);
            $table->boolean('removal_requested')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membership_applications');
    }
};
