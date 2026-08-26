<?php

namespace Database\Factories;

use App\Models\MembershipApplication;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MembershipApplication>
 */
class MembershipApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status'      => 'pending',
            'user_id'     => 1,
            'reviewer_id' => 1,
        ];
    }
}
