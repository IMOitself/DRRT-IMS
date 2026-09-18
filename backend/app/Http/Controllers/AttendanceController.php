<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $attendances = Attendance::all();
        return response()->json($attendances, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attendance = Attendance::create([
            'member_id' => $request->input('member_id'),
            'event_id' => $request->input('event_id'),
            'status' => $request->input('status'),
            'attended_at' => $request->input('attended_at'),
            'proof_of_attendance' => $request->input('proof_of_attendance'),
        ]);

        return response()->json(['attendance_id' => $attendance->id], 201);
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
