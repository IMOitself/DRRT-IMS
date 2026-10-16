<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // pending events are only for officers and advisers to see
        if ($request->filled('all')) {
            return response()->json(Event::all(), 200);
        }

        $events = Event::where('pending_approval', false)->get();
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
            'date' => $request->input('date'),
            'time_hour' => $request->input('time_hour'),
            'time_minute' => $request->input('time_minute'),
            'time_ampm' => $request->input('time_ampm'),
            'participants' => $request->input('participants'),
            'venue_online' => $request->input('venue_online'),
            'venue_facetoface' => $request->input('venue_facetoface'),
            'pending_approval' => true,
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
        $event = Event::findOrFail($id);
        $event->update($request->only([
            'title',
            'description',
            'type',
            'date',
            'time_hour',
            'time_minute',
            'time_ampm',
            'participants',
            'venue_online',
            'venue_facetoface',
        ]));

        return response()->json(['event_id' => $event->id], 200);
    }

    /**
     * Adviser approves an event an officer created.
     */
    public function approve(Event $event)
    {
        // TODO: adviser role only
        $event->update(['pending_approval' => false]);

        return response()->json($event, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // TODO: officer role only
        Event::destroy($id);

        return response()->json(['event_id' => $id], 200);
    }
}
