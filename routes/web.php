<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('login',[API\UserController::class,'login']);
Route::get('logout', [ API\UserController::class, 'logout' ]);




/* Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home') */;

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/storage-link-exist', function () {
    return config('filesystems.links');
});


Route::get("/storage/{folder}/{name}", function(Request $request)
{
    $path = "public/" . $request -> folder . "/" . $request->name;
    return Storage::get($path);
});

Route::fallback(function()
{
    return view("index");

})->name("home");