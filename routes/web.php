<?php

use App\Models\AppSetting;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

Route::post('login', [API\UserController::class,'login']);
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


Route::get("/storage/{folder}/{name}", function (Request $request) {
    $path = "public/" . $request -> folder . "/" . $request->name;
    return Storage::get($path);
});

Route::get("/get-invoice-from-backend", function (Request $request) {

    $order = Order::where("id", $request->id)->first();
    $client = User::where("id", $order->client_id)->first();
    $appSettings = AppSetting::where('id', 1)->first();
    

     $pdf =  PDF::loadView('invoice', [
         'order' => $order,
         'client' => $client,
         'appSettings' => $appSettings
     ])->setPaper("a4", "lanscape");

     $name = "invoice_" . $order->id . ".pdf";

     return $pdf->download($name);


});



Route::fallback(function () {
    return view("index");

})->name("home");
