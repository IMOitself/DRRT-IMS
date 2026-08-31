<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MembershipApplication;
use App\Models\Member;

class MembershipApplicationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $applications = MembershipApplication::all();
        return response()->json(['data' => $applications], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $application = MembershipApplication::create([
            'user_id' => $request->input('user_id'),
            'student_id' => $request->input('student_id'),
            'full_name' => $request->input('full_name'),
            'course' => $request->input('course'),
            'year_level' => $request->input('year_level'),
            'email' => $request->input('email'),
            'phone_number' => $request->input('phone_number'),
            'emergency_person_name' => $request->input('emergency_person_name'),
            'emergency_phone' => $request->input('emergency_phone'),
            'blood_type' => $request->input('blood_type'),
            'consent_form' => $request->input('consent_form'),
            'class_schedule' => $request->input('class_schedule')
        ]);

        return response()->json(['application_id' => $application->id], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(MembershipApplication $application)
    {
        return response()->json(['data' => $application], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $application = MembershipApplication::find($id);
        $application->update([
            'status' => $request->input('status'),
            'reviewer_id' => $request->input('reviewer_id')
        ]);

        if($application->status == 'approved') {
            $member = Member::create([
                'user_id' => $application->user_id,
                'membership_application_id' => $application->id
            ]);
        }

        return response()->json(['application_id' => $application->id], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
