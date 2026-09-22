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
        // TODO: officer role only
        if ($request->filled('all')) {
            return response()->json(Attendance::with('recorder')->get(), 200);
        }

        $attendances = Attendance::where('user_id', $request->user()->id)->get();

        return response()->json($attendances, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // one attendance per member per event, so update it if it already exists
        $attendance = Attendance::updateOrCreate([
            'user_id' => $request->input('user_id'),
            'event_id' => $request->input('event_id'),
        ], [
            'recorder_id' => $request->user()->id,
            'pending_approval' => $request->input('user_id') == $request->user()->id,
            'status' => $request->input('status'),
            'proof_of_attendance' => $request->input('proof_of_attendance'),
            'absent_reason' => $request->input('absent_reason'),
            'absent_supporting_image' => $request->input('absent_supporting_image'),
            'late_reason' => $request->input('late_reason'),
            'late_supporting_image' => $request->input('late_supporting_image'),
            'timein_hour' => $request->input('timein_hour'),
            'timein_minute' => $request->input('timein_minute'),
            'timein_ampm' => $request->input('timein_ampm'),
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
     * Officer approves an attendance a member set for themselves.
     */
    public function approve(Attendance $attendance)
    {
        // TODO: officer role only
        $attendance->update(['pending_approval' => false]);

        return response()->json($attendance, 200);
    }

    /**
     * Member asks an officer to correct their own attendance record.
     */
    public function requestCorrection(Request $request, Attendance $attendance)
    {
        if ($attendance->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $attendance->update(['correction_requested' => true]);

        return response()->json($attendance, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // TODO: officer role only
        Attendance::destroy($id);

        return response()->json(null, 204);
    }
}
