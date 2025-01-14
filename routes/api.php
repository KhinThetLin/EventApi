<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('/event', [EventController::class, 'index']);
Route::get('event/show/{id}', [EventController::class, 'show']);

/*Route::middleware('auth:sanctum')->group(function () {
});*/
Route::middleware(['auth:sanctum', 'check.admin'])->group(function () {
    Route::post('event/store', [EventController::class, 'store']);    
    Route::put('event/update/{id}', [EventController::class, 'update']);
    Route::delete('event/delete/{id}', [EventController::class, 'destroy']);
    Route::post('logout', [AuthController::class, 'logout']);
});
/*
Route::middleware(['auth:sanctum', 'check.admin', 'throttle:10,1'])->post('/event/store', [EventController::class, 'store']);
Route::middleware('throttle:10,1')->post('/event/store', [EventController::class, 'store']);*/