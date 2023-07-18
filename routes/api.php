<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use App\Http\Controllers\API;
use App\Http\Controllers\API\PaypalController;
use App\Http\Controllers\API\StripeController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Auth;

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

Route::get('/user', function (Request $request) {
    if(Auth::check()) {
        return response()->json([
            "user" => Auth::user()
        ]);
    }
    return response()->json([
        "user" => false
    ]);
});

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class,'login']);
Route::post('forget-password', [ UserController::class,'forgetPassword']);
Route::post('social-login', [ UserController::class, 'socialLogin' ]);
Route::get('user-list', [UserController::class, 'userList']);
Route::get('staticdata-list', [API\StaticDataController::class,'getList']);

Route::get('user-detail', [UserController::class, 'userDetail']);
Route::get('country-list', [ API\CountryController::class, 'getList' ]);
Route::get('country-detail', [ API\CountryController::class, 'getDetail' ]);
Route::get('city-list', [ API\CityController::class, 'getList' ]);
Route::get('city-detail', [ API\CityController::class, 'getDetail' ]);
Route::get('extracharge-list', [ API\ExtraChargeController::class, 'getList' ]);
Route::get('paymentgateway-list', [API\PaymentGatewayController::class,'getList']);
Route::get('vehicle-list', [ API\VehicleController::class, 'getList' ]);

Route::get('place-autocomplete-api', [ API\CommonController::class, 'placeAutoComplete' ]);
Route::get('place-detail-api', [ API\CommonController::class, 'placeDetail' ]);
Route::get('distance-between-places', [ API\CommonController::class, 'distanceBetwennTwoPlaces' ]);

Route::get('get-appsetting', [UserController::class,'getAppSetting']);


Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('dashboard-detail', [ UserController::class, 'dashboard' ]);
    Route::get('dashboard-chartdata', [ UserController::class, 'dashboardChartData' ]);

    Route::post('country-save', [ App\Http\Controllers\CountryController::class, 'store' ]);
    Route::post('country-delete/{id}', [ App\Http\Controllers\CountryController::class, 'destroy' ]);
    Route::post('country-action', [ App\Http\Controllers\CountryController::class, 'action' ]);

    Route::post('city-save', [ App\Http\Controllers\CityController::class, 'store' ]);
    Route::post('city-delete/{id}', [ App\Http\Controllers\CityController::class, 'destroy' ]);
    Route::post('city-action', [ App\Http\Controllers\CityController::class, 'action' ]);

    Route::post('extracharge-save', [ App\Http\Controllers\ExtraChargeController::class, 'store' ]);
    Route::post('extracharge-delete/{id}', [ App\Http\Controllers\ExtraChargeController::class, 'destroy' ]);
    Route::post('extracharge-action', [ App\Http\Controllers\ExtraChargeController::class, 'action' ]);

    Route::post('staticdata-save', [ App\Http\Controllers\StaticDataController::class, 'store' ]);
    Route::post('staticdata-delete/{id}', [ App\Http\Controllers\StaticDataController::class, 'destroy' ]);

    Route::get('order-list', [ API\OrderController::class, 'getList' ]);
    Route::get('order-detail', [ API\OrderController::class, 'getDetail' ]);
    Route::post('order-save', [ App\Http\Controllers\OrderController::class, 'store' ]);
    Route::post('order-update/{id}', [ App\Http\Controllers\OrderController::class, 'update' ]);
    Route::post('order-delete/{id}', [ App\Http\Controllers\OrderController::class, 'destroy' ]);
    Route::post('order-action', [ App\Http\Controllers\OrderController::class, 'action' ]);

    Route::post('paymentgateway-save', [ App\Http\Controllers\PaymentGatewayController::class, 'store' ]);

    Route::post('payment-save', [ API\PaymentController::class, 'paymentSave' ]);
    Route::get('payment-list', [ API\PaymentController::class, 'getList' ]);

    Route::post('save-wallet', [ API\WalletController::class, 'saveWallet'])->name('save-wallet');
    Route::get('wallet-list', [ API\WalletController::class, 'getList']);

    Route::get('withdrawrequest-list', [ API\WithdrawRequestController::class, 'getList']);
    Route::post('save-withdrawrequest', [ API\WithdrawRequestController::class, 'saveWithdrawrequest']);
    Route::post('approved-withdrawrequest', [ API\WithdrawRequestController::class, 'approvedWithdrawRequest']);
    Route::post('decline-withdrawrequest', [ API\WithdrawRequestController::class, 'declineWithdrawRequest']);


    Route::post('notification-list', [API\NotificationController::class,'getList']);
    Route::get('notification-count', [API\NotificationController::class,'notificationCounts']);

    Route::post('update-user-status', [UserController::class, 'updateUserStatus']);
    Route::post('change-password', [UserController::class, 'changePassword']);
    Route::post('update-profile', [UserController::class,'updateProfile']);
    Route::post('delete-user', [UserController::class,'deleteUser']);
    Route::post('user-action', [ UserController::class, 'userAction' ]);

    Route::post('update-appsetting', [UserController::class,'updateAppSetting']);

    Route::get('document-list', [ API\DocumentController::class, 'getList' ]);
    Route::post('document-save', [ App\Http\Controllers\DocumentController::class, 'store' ]);
    Route::post('document-delete/{id}', [ App\Http\Controllers\DocumentController::class, 'destroy' ]);
    Route::post('document-action', [ App\Http\Controllers\DocumentController::class, 'action' ]);

    Route::get('delivery-man-document-list', [ API\DeliveryManDocumentController::class, 'getList' ]);
    Route::post('delivery-man-document-save', [ App\Http\Controllers\DeliveryManDocumentController::class, 'store' ]);
    Route::post('delivery-man-document-delete/{id}', [ App\Http\Controllers\DeliveryManDocumentController::class, 'destroy' ]);
    Route::post('delivery-man-document-action', [ App\Http\Controllers\DeliveryManDocumentController::class, 'action' ]);

    Route::post('order-auto-assign', [ App\Http\Controllers\OrderController::class, 'AutoAssignCancelOrder' ]);



    Route::get('logout', [ UserController::class, 'logout' ]);
    Route::get('wallet-detail', [ API\WalletController::class, 'getWallatDetail']);

    Route::get('client-dashboard', [ API\DashboardController::class, 'clientDashboard' ]);
    Route::get('deliveryman-earning-list', [ API\PaymentController::class, 'getDeliveryManEarningList' ]);

    Route::get('user-profile-detail', [ UserController::class, 'commonUserDetail' ]);

    Route::post('vehicle-save', [ App\Http\Controllers\VehicleController::class, 'store' ]);
    Route::post('vehicle-delete/{id}', [ App\Http\Controllers\VehicleController::class, 'destroy' ]);
    Route::post('vehicle-action', [ App\Http\Controllers\VehicleController::class, 'action' ]);


    Route::post('stripe/intent', [StripeController::class, 'paymentIntent']);
    Route::post('stripe/payment', [StripeController::class, 'confirmPaymentIntent']);


    Route::post('/create-payment', [PaypalController::class, 'createPayment']);
    Route::post('/execute-payment', [PaypalController::class, 'executePayment']);


});
