<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Attendance;
use PhpOffice\PhpWord\TemplateProcessor;
use Carbon\Carbon;

class ExportController extends Controller
{
    public function generateActivityReport(Request $request)
    {
        // 1. Load the Word Template
        $templatePath = storage_path('app/templates/activity_report_template.docx');
        if (!file_exists($templatePath)) {
            return response()->json(['error' => 'Template not found'], 404);
        }
        $templateProcessor = new TemplateProcessor($templatePath);

        // 2. Fetch the Event from Database
        $event = Event::findOrFail($request->input('event_id'));

        // --- SECTION 1: SIMPLE TEXT REPLACEMENTS ---
        // Header & Details
        $templateProcessor->setValue('club_name', $request->input('club_name', 'DRRT'));
        $templateProcessor->setValue('officer', $request->input('officer', 'Unknown Officer'));
        $templateProcessor->setValue('pos', $request->input('pos', 'Officer'));
        $templateProcessor->setValue('option_date', $request->input('option_date', ''));
        $templateProcessor->setValue('now_date', $request->input('now_date', Carbon::now()->format('F j, Y')));
        
        // I. Activity Details
        $templateProcessor->setValue('activity_title', $event->title);
        $templateProcessor->setValue('activity_date', Carbon::parse($event->date)->format('F j, Y'));
        $templateProcessor->setValue('start_time', $event->time);
        $templateProcessor->setValue('end_time', $request->input('end_time', ''));
        
        // Smart Venue Logic: Use Online link if it exists, otherwise Face-to-Face
        $venue = $event->venue_online ? "Online (" . $event->venue_online . ")" : $event->venue_facetoface;
        $templateProcessor->setValue('text_venue', $venue);

        // VII. Recommendations & Signatories
        $templateProcessor->setValue('text_recomm', $request->input('text_recomm', 'None'));
        $templateProcessor->setValue('officer_name1', $request->input('officer_name1', ''));
        $templateProcessor->setValue('officer_pos1', $request->input('officer_pos1', ''));
        $templateProcessor->setValue('officer_name2', $request->input('officer_name2', ''));
        $templateProcessor->setValue('officer_pos2', $request->input('officer_pos2', ''));
        $templateProcessor->setValue('officer_name3', $request->input('officer_name3', ''));
        $templateProcessor->setValue('officer_pos3', $request->input('officer_pos3', ''));
        $templateProcessor->setValue('adviser_name', $request->input('adviser_name', 'Ms. Kethleen Onato'));


        // --- SECTION 2: DYNAMIC LISTS & TABLES ---

        // II. Objectives (Numbered List Block)
        $objectives = json_decode($request->input('objectives', '[]'), true);
        if (empty($objectives)) { $objectives = [['obj_sent' => 'N/A']]; }
        $templateProcessor->cloneBlock('obj_sent_block', 0, true, false, $objectives);

        // III. Participants Table (From Database!)
        $attendances = Attendance::with('user.membershipApplication')
            ->where('event_id', $event->id)
            ->where('status', 'present')
            ->get();
            
        $participantsTable = [];
        foreach ($attendances as $att) {
            $app = $att->user->membershipApplication;
            $courseYear = $app ? ($app->course . ' - ' . $app->year_level . ' Year') : 'N/A';
            $role = $att->user->role === 'officer' ? 'Officer' : 'Member';

            $participantsTable[] = [
                'parti_name' => $att->user->name,
                'cour_year' => $courseYear,
                'pos' => $role
            ];
        }
        if (empty($participantsTable)) { $participantsTable[] = ['parti_name' => 'None', 'cour_year' => '-', 'pos' => '-']; }
        $templateProcessor->cloneRowAndSetValues('parti_name', $participantsTable);

        // IV. Activities Conducted Table
        $activities = json_decode($request->input('activities', '[]'), true);
        if (empty($activities)) { $activities = [['text_act' => '-', 'text_desc' => '-', 'text_outc' => '-']]; }
        $templateProcessor->cloneRowAndSetValues('text_act', $activities);

        // V. Issues and Challenges Table
        $issues = json_decode($request->input('issues', '[]'), true);
        if (empty($issues)) { $issues = [['text_issue' => 'None', 'text_sol' => '-']]; }
        $templateProcessor->cloneRowAndSetValues('text_issue', $issues);


        // --- SECTION 3: THE 9 PICTURES ---
        for ($i = 1; $i <= 9; $i++) {
            $placeholder = 'img' . $i;
            
            // Did the user upload a file for this specific slot? (e.g. image1, image2)
            if ($request->hasFile('image' . $i)) {
                $file = $request->file('image' . $i);
                $templateProcessor->setImageValue($placeholder, [
                    'path' => $file->getPathname(), // Gets the temp uploaded file path
                    'width' => 150, 
                    'height' => 150, 
                    'ratio' => true
                ]);
            } else {
                // If no image uploaded for this slot, inject the invisible blank.png!
                $templateProcessor->setImageValue($placeholder, [
                    'path' => public_path('blank.png'),
                    'width' => 1,
                    'height' => 1
                ]);
            }
        }

        // --- SECTION 4: SAVE AND DOWNLOAD ---
        $fileName = 'Activity_Report_' . $event->id . '_' . time() . '.docx';
        $tempPath = storage_path('app/' . $fileName);
        $templateProcessor->saveAs($tempPath);

        return response()->download($tempPath)->deleteFileAfterSend(true);
    }
}