<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BunsController;

Route::get('/buns', [BunsController::class, 'index']);