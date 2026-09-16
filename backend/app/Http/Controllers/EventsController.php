<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::all();
        return response()->json($events, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $event = Event::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'type' => $request->input('type'),
            'date_time' => $request->input('date_time'),
            'participants' => $request->input('participants'),
            'venue-online' => $request->input('venue-online'),
            'venue-onsite' => $request->input('venue-onsite'),
            'is_public' => $request->input('is_public', false),
        ]);

        return response()->json(['event_id' => $event->id], 201);
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
