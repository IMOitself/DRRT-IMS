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

// for logged in
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user', [AuthController::class, 'updateProfile']);
    
    // TODO: officer role only
    Route::get('/membership-applications', [MembershipApplicationsController::class, 'index']);
    Route::put('/membership-applications/{application}', [MembershipApplicationsController::class, 'update']);
    Route::delete('/membership-applications/{application}', [MembershipApplicationsController::class, 'destroy']);
    Route::delete('/membership-applications/{application}/member', [MembershipApplicationsController::class, 'removeMember']);

    Route::get('/members', function () {
        // officers are members too, graduated members are no longer part of attendance
        return User::whereIn('role', ['member', 'officer'])
            ->whereDoesntHave('membershipApplication', fn ($query) => $query->where('status', 'graduated'))
            ->with('membershipApplication')
            ->orderBy('name')
            ->get();
    });

    Route::get('/officers', function () {
        return User::where('role', 'officer')->orderBy('name')->get();
    });

    Route::put('/users/{user}/role', function (\Illuminate\Http\Request $request, User $user) {
        $data = ['role' => $request->input('role')];
        if ($request->input('role') === 'officer') {
            $data['has_incident_access'] = true;
        }
        $user->update($data);
        return response()->json($user, 200);
    });

    Route::put('/users/{user}/incident-access', function (\Illuminate\Http\Request $request, User $user) {
        if ($request->user()->role !== 'adviser') {
            return response()->json(['message' => 'Only the adviser can edit incident access.'], 403);
        }
        $user->update(['has_incident_access' => $request->boolean('has_incident_access')]);
        return response()->json($user, 200);
    });
    
    Route::post('/events', [EventsController::class, 'store']);
    Route::put('/events/{event}', [EventsController::class, 'update']);
    Route::put('/events/{event}/approve', [EventsController::class, 'approve']);
    Route::delete('/events/{event}', [EventsController::class, 'destroy']);
    
    Route::get('/attendances', [AttendanceController::class, 'index']);
    Route::post('/attendances', [AttendanceController::class, 'store']);
    Route::put('/attendances/{attendance}/correction-request', [AttendanceController::class, 'requestCorrection']);
    Route::delete('/attendances/{attendance}', [AttendanceController::class, 'destroy']);

    Route::get('/incident-reports', [IncidentReportsController::class, 'index']);
    Route::post('/incident-reports', [IncidentReportsController::class, 'store']);
    Route::put('/incident-reports/{incidentReport}', [IncidentReportsController::class, 'update']);
    Route::delete('/incident-reports/{incidentReport}', [IncidentReportsController::class, 'destroy']);
});