<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\MembershipApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
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
        $html = <<<HTML
        <div style="font-family:Arial,sans-serif;color:#333;max-width:480px;margin:0 auto;padding:24px;">
            <p style="font-size:16px;margin:0 0 16px;">Hello!</p>
            <p style="font-size:14px;margin:0 0 12px;">Your <strong>DRRT-IMS</strong> email verification code is:</p>
            <div style="width:100%;box-sizing:border-box;background:#f3f4f6;border:1px solid #d1d5db;border-radius:8px;padding:20px 0;text-align:center;font-size:36px;font-weight:bold;letter-spacing:10px;color:#111;">{$code}</div>
            <p style="font-size:14px;margin:16px 0 0;">This code is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
            <p style="font-size:12px;color:#888;margin:24px 0 0;">&mdash; DRRT Information Management System</p>
        </div>
        HTML;
        // ==== END OF EMAIL MESSAGE ====

        try {
            Mail::html($html, function ($message) use ($request, $subject, $body) {
                $message->to($request->email)->subject($subject)->text($body);
            });
        } catch (\Throwable $e) {
            Log::error('Failed to send verification code: ' . $e->getMessage());

            return response()->json([
                'message' => 'Could not send the verification email. Please try again or contact an officer.',
            ], 500);
        }

        return response()->json(['message' => 'Verification code sent.']);
    }

    public function sendPasswordResetCode(Request $request){
        $request->validate([
            'email' => 'required|string|email|exists:users,email',
        ]);

        $code = (string) random_int(100000, 999999);

        Cache::put('password_reset_' . $request->email, $code, now()->addMinutes(10));

        try {
            Mail::raw("Your DRRT-IMS password reset code is: {$code}\n\nThis code is valid for 10 minutes. Do not share it with anyone.", function ($message) use ($request) {
                $message->to($request->email)->subject('Your DRRT-IMS password reset code');
            });
        } catch (\Throwable $e) {
            Log::error('Failed to send password reset code: ' . $e->getMessage());

            return response()->json([
                'message' => 'Could not send the reset email. Please try again or contact an officer.',
            ], 500);
        }

        return response()->json(['message' => 'Password reset code sent.']);
    }

    public function resetPassword(Request $request){
        $request->validate([
            'email' => 'required|string|email|exists:users,email',
            'code' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        if (Cache::get('password_reset_' . $request->email) !== $request->code) {
            return response()->json(['message' => 'The verification code is invalid or has expired.'], 422);
        }

        User::where('email', $request->email)->update([
            'password' => Hash::make($request->password),
        ]);

        Cache::forget('password_reset_' . $request->email);

        return response()->json(['message' => 'Password has been reset.']);
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
