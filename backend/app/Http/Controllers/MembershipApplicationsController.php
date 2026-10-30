<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MembershipApplication;
use App\Models\User;
use App\Models\Attendance;
use Illuminate\Support\Facades\DB;

class MembershipApplicationsController extends Controller
{
    // secret link token, so whoever submitted the form can still open it before registering
    private function accessToken(MembershipApplication $application)
    {
        return hash_hmac('sha256', (string) $application->id, config('app.key'));
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $applications = MembershipApplication::with('user:id,role,has_incident_access')
            ->orderBy('last_name')
            ->orderBy('first_name')
            ->orderBy('middle_name')
            ->get()
            ->map(function ($application) {
                // officers share this link with applicants who have no account yet
                $application->access_token = $this->accessToken($application);
                $application->user_role = $application->user?->role;
                $application->has_incident_access = $application->user?->has_incident_access;
                return $application;
            });
        return response()->json(['data' => $applications], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'course' => 'required|in:BSIS,BSA,BSAIS,BSSW,BAB,ACT',
            'year_level' => 'required|integer|between:1,' . ($request->course === 'ACT' ? 2 : 4),
        ]);

        $application = MembershipApplication::create([
            'student_id' => $request->input('student_id'),
            'last_name' => $request->input('last_name'),
            'first_name' => $request->input('first_name'),
            'middle_name' => $request->input('middle_name'),
            'course' => $request->input('course'),
            'year_level' => $request->input('year_level'),
            'email' => $request->input('email'),
            'phone_number' => $request->input('phone_number'),
            'emergency_person_name' => $request->input('emergency_person_name'),
            'emergency_phone' => $request->input('emergency_phone'),
        ]);

        return response()->json([
            'application_id' => $application->id,
            'access_token' => $this->accessToken($application),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, MembershipApplication $application)
    {
        // only officers, the member who owns the application, and whoever holds its link token may view it
        $user = auth('sanctum')->user();
        $isOwner = $user && $user->id === $application->user_id;
        $isOfficer = $user && $user->role === 'officer';
        $hasToken = hash_equals($this->accessToken($application), (string) $request->query('token'));

        if (! $isOwner && ! $isOfficer && ! $hasToken) {
            return response()->json(['message' => 'You are not allowed to view this application.'], 403);
        }

        return response()->json(['data' => $application], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $application = MembershipApplication::find($id);
        // only what was sent, so marking as graduated doesn't wipe the reviewer
        $application->update($request->only(['status', 'reviewer_id', 'removal_requested']));

        return response()->json(['application_id' => $application->id], 200);
    }

    /**
     * Remove the member, both their application and their account.
     */
    public function removeMember(string $id)
    {
        if (auth()->user()->role !== 'adviser') {
            return response()->json(['message' => 'Only the adviser can remove members.'], 403);
        }

        $application = MembershipApplication::find($id);

        DB::transaction(function () use ($application) {
            $user = $application->user_id ? User::find($application->user_id) : null;
            $application->delete();

            if (! $user) return;

            // keep the records they touched, just forget who did it
            Attendance::where('recorder_id', $user->id)->update(['recorder_id' => null]);
            MembershipApplication::where('reviewer_id', $user->id)->update(['reviewer_id' => null]);

            // their own attendances go with them
            $user->tokens()->delete();
            $user->delete();
        });

        return response()->json(['application_id' => $id], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $application = MembershipApplication::find($id);
        $application->delete();

        return response()->json(['application_id' => $id], 200);
    }
}
