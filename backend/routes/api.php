<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MembershipApplicationsController;

Route::post('/membership-applications', [MembershipApplicationsController::class, 'store']);