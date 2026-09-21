<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Event;
use App\Models\MembershipApplication;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'sasha braus',
        //     'email' => 'potato@gmail.com',
        //     'role' => 'member'
        // ]);

        // User::factory()->create([
        //     'name' => 'king fritz',
        //     'email' => 'king.fritz@gmail.com',
        //     'role' => 'adviser'
        // ]);

        $officer = User::factory()->create([
            'name' => 'Captain Erwin',
            'email' => 'captain.erwin@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'officer'
        ]);
        $member = User::factory()->create([
            'name' => 'background character',
            'email' => 'imabackgroundcharacter@gmail.com',
            'password' => 'background',
            'role' => 'member'
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member->id,
            'reviewer_id' => $officer->id,
            'student_id' => '2026-00001',
            'full_name' => $member->name,
            'course' => 'BSIS',
            'year_level' => 2,
            'email' => $member->email,
            'phone_number' => '09123456789',
            'emergency_person_name' => 'some relative',
            'emergency_phone' => '09987654321',
            'consent_form' => 'consent_forms/background-character.pdf',
            'class_schedule' => 'class_schedules/background-character.pdf',
        ]);

        Event::create([
            'title' => 'Foundation Week 2027',
            'description' => 'just the foundation week idk',
            'date' => '2027-01-01',
            'time' => '08:00',
            'type' => 'meeting',
            'participants' => 'All students',
            'venue_facetoface' => 'School Grounds',
            'require_proof_of_attendance' => true,
        ]);
        Event::create([
            'title' => 'Seminar',
            'description' => 'just a seminar idk',
            'date' => '2026-11-01',
            'time' => '08:00',
            'type' => 'drill',
            'participants' => 'All students',
            'venue_online' => 'gmeet',
            'require_proof_of_attendance' => false,
        ]);
    }
}
