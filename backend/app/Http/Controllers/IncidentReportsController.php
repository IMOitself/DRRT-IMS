<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IncidentReport;

class IncidentReportsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = IncidentReport::with('reporter')->latest();

        // only the adviser sees every report, members only see the ones they filed
        if ($request->user()->role !== 'adviser') {
            $query->where('reporter_id', $request->user()->id);
        }

        $incidentReports = $query->get();
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
}
