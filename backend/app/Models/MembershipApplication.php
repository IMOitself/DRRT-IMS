<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembershipApplication extends Model
{
    use HasFactory;

    protected $guarded = [];

    // so the frontend still gets one ready-to-display name
    protected $appends = ['full_name'];

    // "Ackerman, Levi A." from the separate name columns
    public function getFullNameAttribute()
    {
        $name = trim("{$this->last_name}, {$this->first_name}");

        $middleName = trim((string) $this->middle_name);
        if ($middleName !== '') $name .= ' ' . strtoupper($middleName[0]) . '.';

        return $name;
    }
}
