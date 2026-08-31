<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MembershipApplicationsController;
use App\Http\Controllers\MembersController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/membership-applications', [MembershipApplicationsController::class, 'store']);
    // TODO: only the officers and the user who made the application can access this
    Route::get('/membership-applications/{application}', [MembershipApplicationsController::class, 'show']);

    // TODO: officer role only
    Route::get('/membership-applications', [MembershipApplicationsController::class, 'index']);
    Route::put('/membership-applications/{application}', [MembershipApplicationsController::class, 'update']);

    Route::get('/members', [MembersController::class, 'index']);
});