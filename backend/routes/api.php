<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MembershipApplicationsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\IncidentReportsController;
use App\Models\User;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/send-verification-code', [AuthController::class, 'sendVerificationCode']);
Route::post('/send-password-reset-code', [AuthController::class, 'sendPasswordResetCode']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/login',[AuthController::class, 'login']);
Route::get('/events', [EventsController::class, 'index']);
Route::post('/membership-applications', [MembershipApplicationsController::class, 'store']);
Route::get('/membership-applications/{application}', [MembershipApplicationsController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user', [AuthController::class, 'updateProfile']);
    
    // TODO: officer role only
    Route::get('/membership-applications', [MembershipApplicationsController::class, 'index']);
    Route::put('/membership-applications/{application}', [MembershipApplicationsController::class, 'update']);
    Route::delete('/membership-applications/{application}', [MembershipApplicationsController::class, 'destroy']);
    
    Route::get('/members', function () {
        return User::where('role', 'member')->with('membershipApplication')->get();
    });

    Route::get('/officers', function () {
        return User::where('role', 'officer')->get();
    });
    
    Route::post('/events', [EventsController::class, 'store']);
    // Route::put('/events/{event}', [EventsController::class, 'update']);
    // Route::delete('/events/{event}', [EventsController::class, 'destroy']);
    
    Route::get('/attendances', [AttendanceController::class, 'index']);
    Route::post('/attendances', [AttendanceController::class, 'store']);
    // Route::put('/attendances/{attendance}', [AttendanceController::class, 'update']);
    Route::put('/attendances/{attendance}/approve', [AttendanceController::class, 'approve']);
    Route::put('/attendances/{attendance}/correction-request', [AttendanceController::class, 'requestCorrection']);
    Route::delete('/attendances/{attendance}', [AttendanceController::class, 'destroy']);

    Route::get('/incident-reports', [IncidentReportsController::class, 'index']);
    Route::post('/incident-reports', [IncidentReportsController::class, 'store']);
});