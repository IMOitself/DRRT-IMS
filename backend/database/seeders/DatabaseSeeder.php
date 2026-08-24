<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Buns;
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
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Buns::create([
            'filling' => 'hotdog',
            'days_old' => 3
        ]);
        Buns::create([
            'filling' => 'peanut',
            'days_old' => 1
        ]);
    }
}
