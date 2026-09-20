<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $attendances = Attendance::where('user_id', $user->id)->get();

        return response()->json($attendances, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attendance = Attendance::create([
            'user_id' => $request->input('user_id'),
            'event_id' => $request->input('event_id'),
            'status' => $request->input('status'),
            'proof_of_attendance' => $request->input('proof_of_attendance'),
            'timein_hour' => $request->input('timein_hour'),
            'timein_minute' => $request->input('timein_minute'),
            'ampm' => $request->input('ampm'),
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
