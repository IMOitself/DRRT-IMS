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

        $officer = User::factory()->create([
            'name' => 'Captain Erwin',
            'email' => 'captain.erwin@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'officer'
        ]);
        // officers are members first, so they have a membership application too
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $officer->id,
            'student_id' => '2026-00000',
            'last_name' => 'Smith',
            'first_name' => 'Erwin',
            'middle_name' => null,
            'course' => 'BSIS',
            'year_level' => 4,
            'email' => $officer->email,
            'phone_number' => '09111111111',
            'emergency_person_name' => 'Levi Ackerman',
            'emergency_phone' => '09222222222',
            'consent_form' => 'consent_forms/captain-erwin.pdf',
            'class_schedule' => 'class_schedules/captain-erwin.pdf',
        ]);
        User::factory()->create([
            'name' => 'King Fritz',
            'email' => 'king.fritz@gmail.com',
            'password' => 'foundingtitan',
            'role' => 'adviser'
        ]);
        $member = User::factory()->create([
            'name' => 'Background, Character C.',
            'email' => 'imabackgroundcharacter@gmail.com',
            'password' => 'background',
            'role' => 'member'
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member->id,
            'reviewer_id' => $officer->id,
            'student_id' => '2026-00001',
            'last_name' => 'Background',
            'first_name' => 'Character',
            'middle_name' => 'Cameo',
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
            'title' => 'Earthquake Drill',
            'description' => 'earthquake drill and stuff',
            'date' => '2026-09-24',
            'time_hour' => '08',
            'time_minute' => '00',
            'time_ampm' => 'AM',
            'type' => 'drill',
            'participants' => 'All students',
            'venue_online' => 'gmeet',
        ]);

        Event::create([
            'title' => 'Foundation Week 2027',
            'description' => 'just the foundation week idk',
            'date' => '2027-01-01',
            'time_hour' => '08',
            'time_minute' => '00',
            'time_ampm' => 'AM',
            'type' => 'meeting',
            'participants' => 'All students',
            'venue_facetoface' => 'School Grounds',
        ]);
    }
}
