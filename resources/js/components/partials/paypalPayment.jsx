import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { postWithAxios } from "../api/axios";

const PaypalPayment = () => {
    const [approvalUrl, setApprovalUrl] = useState(null);

    const createPayment = async () => {
        try {
            const dataToSend = {};
            const response = await postWithAxios(
                "/api/create-payment",
                dataToSend
            );

            const data =  response;
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
        <PayPalScriptProvider
            options={{ "client-id": "your_paypal_client_id" }}
        >
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
