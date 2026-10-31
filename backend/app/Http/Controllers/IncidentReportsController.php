<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IncidentReport;

class IncidentReportsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $incidentReports = IncidentReport::with('reporter')->latest()->get();
        return response()->json($incidentReports, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $incidentReport = IncidentReport::create([
            'reporter_id' => $request->user()->id,
            ...$request->only([
                'date', 'name', 'age', 'address', 'chief_complaint',
                'vitals',
                'signs_symptoms', 'allergies', 'medications', 'past_medical_history', 'last_oral_intake', 'events_leading',
                'onset', 'provocation', 'quality', 'region_radiation', 'severity', 'time',
                'treatment', 'team_leader', 'endorsed_to',
            ]),
        ]);

        return response()->json(['incident_report_id' => $incidentReport->id], 201);
    }

    public function update(Request $request, IncidentReport $incidentReport)
    {
        $incidentReport->update($request->only(['removal_requested']));

        return response()->json($incidentReport, 200);
    }

    public function destroy(IncidentReport $incidentReport)
    {
        if (auth()->user()->role !== 'adviser') {
            return response()->json(['message' => 'Only the adviser can delete incident reports.'], 403);
        }

        $incidentReport->delete();

        return response()->json(['incident_report_id' => $incidentReport->id], 200);
    }
}
