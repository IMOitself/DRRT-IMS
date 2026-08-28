<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MembershipApplicationsController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/membership-applications', [MembershipApplicationsController::class, 'index']);
    Route::post('/membership-applications', [MembershipApplicationsController::class, 'store']);
    Route::get('/membership-applications/{application}', [MembershipApplicationsController::class, 'show']);
});