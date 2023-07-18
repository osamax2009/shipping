import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getWithAxios, postWithAxios } from "../api/axios";

const getpaypalKey = async () => {
    let key = null;
    const res = await getWithAxios("/api/paymentgateway-list");
    const paypal = res.data.filter((e) => e.type == "paypal");
    key = paypal[0]?.test_value?.client_id;
    return key;
};

const client_id = await getpaypalKey();

const options = {
    "client-id": client_id,
};

const PaypalPayment = () => {
    const [approvalUrl, setApprovalUrl] = useState(null);

    const createPayment = async () => {
        try {
            const dataToSend = {};
            const response = await postWithAxios(
                "/api/create-payment",
                dataToSend
            );

            const data = response;
            setApprovalUrl(data.approvalUrl);
        } catch (error) {
            console.error(error);
        }
    };

    const onApprove = async (data) => {
        try {
            const response = await fetch("/api/execute-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    paymentId: data.paymentID,
                    payerId: data.payerID,
                }),
            });

            const result = await response.json();
            console.log(result); // Handle the payment execution result
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PayPalScriptProvider options={options}>
            <div>
                <button onClick={createPayment}>Create Payment</button>
            </div>
            {approvalUrl && (
                <div>
                    <PayPalButtons
                        createOrder={() => {}}
                        onApprove={onApprove}
                    />
                </div>
            )}
        </PayPalScriptProvider>
    );
};

export default PaypalPayment;
