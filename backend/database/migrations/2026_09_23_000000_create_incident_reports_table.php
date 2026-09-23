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
        Schema::create('incident_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reporter_id')->nullable()->constrained('users')->nullOnDelete();

            // patient details
            $table->date('date')->nullable();
            $table->string('name')->nullable();
            $table->unsignedSmallInteger('age')->nullable();
            $table->string('address')->nullable();
            $table->string('chief_complaint')->nullable();

            // up to 3 rows of { time, bp, spo2, pr, rr, temp }
            $table->json('vitals')->nullable();

            // SAMPLE history
            $table->text('signs_symptoms')->nullable();
            $table->text('allergies')->nullable();
            $table->text('medications')->nullable();
            $table->text('past_medical_history')->nullable();
            $table->text('last_oral_intake')->nullable();
            $table->text('events_leading')->nullable();

            // OPQRST pain assessment
            $table->text('onset')->nullable();
            $table->text('provocation')->nullable();
            $table->text('quality')->nullable();
            $table->text('region_radiation')->nullable();
            $table->text('severity')->nullable();
            $table->text('time')->nullable();

            // treatment & signatures
            $table->text('treatment')->nullable();
            $table->string('team_leader')->nullable();
            $table->string('endorsed_to')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incident_reports');
    }
};
