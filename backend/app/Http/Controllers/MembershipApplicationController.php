<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MembershipApplication;

class MembershipApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $application = MembershipApplication::create([
            'user_id' => $request->input('user_id', 1),
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

        return response()->json(['status' => 'ok', 'data' => $application]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
