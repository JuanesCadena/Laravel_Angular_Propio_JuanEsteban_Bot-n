<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');
});
Route::controller(\App\Http\Controllers\DilemaController::class)->group(function () {
    Route::delete('dilemas/{id}', 'delete');

    Route::post('dilemas/create', 'store');
    Route::delete('/dilemas/{id}', 'deleteDilema');
    Route::get('home', 'showRandomDilema');
    Route::middleware('auth:api')->get('/dilemas', 'myindex');
    Route::middleware('auth:api')->get('/dilemas/admin', 'indexAdmin');

    Route::delete('dilemas/{id}', 'delete');
});



