<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\MembershipApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    private function loadUserData($user)
    {
        $user->membership_application = MembershipApplication::where('user_id', $user->id)->first();

        return $user;
    }

    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'membership_application_id' => 'required|exists:membership_applications,id',
        ]);

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
