<?php

namespace App\Http\Controllers;

use App\Models\PaymentGateway;
use Illuminate\Http\Request;
use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;

class PaypalController extends Controller
{
    private $apiContext;
    
    public function __construct()
    {
        $this->apiContext = new ApiContext(
            new OAuthTokenCredential(
                config('services.paypal.client_id'),
                config('services.paypal.secret')
            )
        );
    }

    public function createPayment(Request $request)
    {
        $paypal = PaymentGateway::where("type", "paypal")->first();

        $apiContext = new ApiContext(
            new OAuthTokenCredential(
                $paypal['client_id'],
                $paypal['client_id']
            )
        );

        $payment = new Payment();
        // Set payment details
        
        try {
            $payment->create($this->apiContext);
            return response()->json([
                'approvalUrl' => $payment->getApprovalLink()
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function executePayment(Request $request)
    {
        $paymentId = $request->input('paymentId');
        $payerId = $request->input('payerId');

        $payment = Payment::get($paymentId, $this->apiContext);

        $execution = new PaymentExecution();
        $execution->setPayerId($payerId);

        try {
            $result = $payment->execute($execution, $this->apiContext);
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
