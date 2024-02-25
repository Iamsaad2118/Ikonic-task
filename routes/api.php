<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('login', [API\LoginController::class, 'login']);
Route::post('add_user', [API\LoginController::class, 'add_user']);

Route::post('register', [API\RegisterController::class, 'register']);
// Route::post('logout','UserController@logoutApi');
// Route::post('logout', [API\LoginController::class, 'logoutApi']);
Route::middleware('token')->group(function () {
    Route::post('logout', [API\LoginController::class, 'logout']); 
});

    
Route::group(['prefix' => 'admin',  'middleware' => 'token'], function(){
    Route::get('getFeedbacks', [API\AdminController::class, 'getFeedbacks']);
    Route::get('getCategories', [API\AdminController::class, 'getCategories']);
    Route::post('createFeedback', [API\AdminController::class, 'createFeedback']);
    Route::post('addComment', [API\AdminController::class, 'addComment']);
    Route::get('getUsers', [API\AdminController::class, 'getUsers']);
    Route::get('getComments', [API\AdminController::class, 'getComments']);
});

Route::group(['prefix' => 'client',  'middleware' => 'token'], function(){
    
});