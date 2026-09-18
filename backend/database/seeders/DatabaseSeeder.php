<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Event;
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
        //     'name' => 'background character',
        //     'email' => 'imabackgroundcharacter@gmail.com',
        // ]);

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

        User::factory()->create([
            'name' => 'Captain Erwin',
            'email' => 'captain.erwin@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'officer'
        ]);

        Event::create([
            'title' => 'Foundation Week 2027',
            'description' => 'just the foundation week idk',
            'date' => 'Jan 1, 2027',
            'time' => '08:00 AM',
        ]);
        Event::create([
            'title' => 'Seminar',
            'description' => 'just a seminar idk',
            'date' => 'Nov 1, 2026',
            'time' => '08:00 AM',
        ]);
    }
}
