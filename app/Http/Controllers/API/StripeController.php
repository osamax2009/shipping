<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\PaymentGateway;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Charge;

class StripeController extends Controller
{
    public function paymentIntent(Request $request)
    {

        $stripe = PaymentGateway::where("type", 'stripe')->first();
        $secret_key = $stripe->test_value['secret_key'];
        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
        $stripe = new \Stripe\StripeClient($secret_key);

        $intent = $stripe->paymentIntents->create([
          'amount' => $request->amount,
          'currency' => $request->currency,
          'payment_method_types' => ['card'],
        ]);

        if(isset($intent->client_secret)) {
            // $payment = Payment::updateOrCreate([]);
        }
        return response()->json([
          'intent' => $intent
        ]);
    }

    public function confirmPaymentIntent(Request $request)
    {
        $stripe = PaymentGateway::where("type", 'stripe')->first();
        $secret_key = $stripe->test_value['secret_key'];

        $stripe = new \Stripe\StripeClient($secret_key);

        try {
            $intent =  $stripe->paymentIntents->confirm(
                $request->paymentIntentId,
                ['payment_method' => 'pm_card_visa']
            );

  
            return response()->json([
              'success' => true,
              "intent" => $intent
        ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }


    public function stripePost(Request $request)
    {
        $stripe = PaymentGateway::where("type", 'stripe')->first();
        $secret_key = $stripe->test_value['secret_key'];

        Stripe::setApiKey($secret_key);

        $token = $request->input('token');
        $amount = $request->input('amount');

        try {
            Charge::create([
                'amount' => $amount,
                'currency' => 'usd',
                'description' => 'Stripe Payment',
                'source' => "tok_visa",
            ]);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }

    }
}
