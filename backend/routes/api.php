<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MembershipApplicationsController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/membership-applications', [MembershipApplicationsController::class, 'index']);
    Route::post('/membership-applications', [MembershipApplicationsController::class, 'store']);
    Route::get('/membership-applications/{application}', [MembershipApplicationsController::class, 'show']);

    Route::middleware('role:officer')->group(function () {
        // TODO: Add officer routes here
    });
});