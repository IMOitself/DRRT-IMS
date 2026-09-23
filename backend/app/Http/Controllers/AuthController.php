<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\MembershipApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    private function loadUserData($user)
    {
        $user->membership_application = MembershipApplication::where('user_id', $user->id)->first();

        return $user;
    }

    public function sendVerificationCode(Request $request){
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        $code = (string) random_int(100000, 999999);

        Cache::put('email_verification_' . $request->email, $code, now()->addMinutes(10));

        // ==== EDIT THE EMAIL MESSAGE HERE ====
        $subject = 'Your DRRT-IMS verification code';
        $body = <<<TEXT
        Hello!

        Your DRRT-IMS email verification code is: {$code}

        This code is valid for 10 minutes. Do not share it with anyone.

        - DRRT Information Management System
        TEXT;
        // ==== END OF EMAIL MESSAGE ====

        Mail::raw($body, function ($message) use ($request, $subject) {
            $message->to($request->email)->subject($subject);
        });

        return response()->json(['message' => 'Verification code sent.']);
    }

    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'code' => 'required|string',
            'membership_application_id' => 'required|exists:membership_applications,id',
        ]);

        if (Cache::get('email_verification_' . $request->email) !== $request->code) {
            return response()->json(['message' => 'The verification code is invalid or has expired.'], 422);
        }

        $application = MembershipApplication::find($request->membership_application_id);

        if ($application->status !== 'approved_need_register') {
            return response()->json(['message' => 'This application is not approved for registration.'], 403);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'member',
        ]);

        $application->update([
            'status' => 'approved_member_now',
            'user_id' => $user->id,
        ]);

        Cache::forget('email_verification_' . $request->email);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $this->loadUserData($user),
            'token' => $token,
        ], 201);
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $this->loadUserData($user),
            'token' => $token,
        ]);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out'], 200);
    }

    public function user(Request $request){
        $user = $request->user();

        return response()->json($this->loadUserData($user));
    }
}
