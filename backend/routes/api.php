<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MembershipApplicationsController;

Route::get('/membership-applications', [MembershipApplicationsController::class, 'index']);
Route::post('/membership-applications', [MembershipApplicationsController::class, 'store']);
Route::get('/membership-applications/{application}', [MembershipApplicationsController::class, 'show']);