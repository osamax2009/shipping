<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaymentGateway;

class PaymentGatewayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

       /*  return response()->json([
            't' => $request->test_value,
            "data" => $data
        ]); */

        if(is_string(($data['test_value']))) {
            $val = json_decode($request->test_value, true);
            $data["test_value"] = json_encode($val);
        }

        // $data["test_value"] = json_decode($request->test_value,true);

        $result = PaymentGateway::updateOrCreate(['id' => $request->id], $data);

        uploadMediaFile($result, $request->gateway_logo, 'gateway_logo');
        $message = __('message.update_form', [ 'form' => __('message.payment_gateway') ]);
        if($result->wasRecentlyCreated) {
            $message = __('message.save_form', [ 'form' => __('message.payment_gateway') ]);
        }

        if($request->is('api/*')) {
            return json_message_response($message);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
