<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MembershipApplicationController;

Route::post('/membership-applications', [MembershipApplicationController::class, 'store']);