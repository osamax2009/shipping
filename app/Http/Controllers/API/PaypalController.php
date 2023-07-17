<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PaymentGateway;
use Illuminate\Http\Request;
use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;

class PaypalController extends Controller
{
   

    public function createPayment(Request $request)
    {
        $paypal = PaymentGateway::where("type", "paypal")->first();

        $apiContext = new ApiContext(
            new OAuthTokenCredential(
                $paypal['client_id'],
                $paypal['secret_id']
            )
        );

        $payment = new Payment();
        // Set payment details
        
        try {
            $payment->create($apiContext);
            return response()->json([
                'approvalUrl' => $payment->getApprovalLink()
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function executePayment(Request $request)
    {
        $paypal = PaymentGateway::where("type", "paypal")->first();

        $apiContext = new ApiContext(
            new OAuthTokenCredential(
                $paypal['client_id'],
                $paypal['secret_id']
            )
        );

        
        $paymentId = $request->input('paymentId');
        $payerId = $request->input('payerId');

        $payment = Payment::get($paymentId, $apiContext);

        $execution = new PaymentExecution();
        $execution->setPayerId($payerId);

        try {
            $result = $payment->execute($execution, $apiContext);
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
