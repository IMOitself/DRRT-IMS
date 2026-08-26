<?php

namespace Database\Seeders;

use App\Models\User;
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

        User::factory()->create([
            'name' => 'background character',
            'email' => 'imabackgroundcharacter@gmail.com',
        ]);

        User::factory()->create([
            'name' => 'sasha braus',
            'email' => 'potato@gmail.com',
            'role' => 'member'
        ]);

        User::factory()->create([
            'name' => 'levi ackerman',
            'email' => 'janitor@gmail.com',
            'role' => 'officer'
        ]);

        User::factory()->create([
            'name' => 'capt. erwin smith',
            'email' => 'apple@gmail.com',
            'role' => 'adviser'
        ]);
    }
}
