/* import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { getWithAxios, postWithAxios } from "../api/axios";
import { toast } from "react-toastify";
import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";

import { Loading, Modal } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppSettingsContext } from "../contexts/appSettings";
import { UserContext } from "../contexts/userContext";

const getStripeKey = async () => {
    let key = null;
    const res = await getWithAxios("/api/paymentgateway-list");
    const stripe = res.data.filter((e) => e.type == "stripe");
    key = stripe[0]?.test_value?.publishable_key;
    return key;
};

const publishable_key = await getStripeKey();

// const stripePromise = loadStripe(publishable_key);

// console.log(await stripePromise)
const StripePayment = () => {
    const location = useLocation();
    const state = location.state;

    const options = {
        clientSecret: state?.intent.client_secret,
        layout: {
            type: "tabs",
            defaultCollapsed: false,
        },
    };

    // console.log(state?.intent.client_secret)

    //const stripe = useStripe();

    if (publishable_key) {
        return (
            <Elements stripe={loadStripe(publishable_key)} options={options}>
                <StripePaymentForm />
            </Elements>
        );
    }
};

// export default StripePayment;

const StripePaymentForm = () => {
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState();
    const [processing, setProcessing] = useState(false);
    const location = useLocation();
    const state = location.state;
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async (event) => {
        event.preventDefault();

        setProcessing(true);
        //  const stripe = await stripePromise;

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const response = await postWithAxios("/api/stripe/payment", {
            paymentIntentId: state.intent.id,
        });

        const { success, error } = response;

        if (success) {
            const dataToSend = {
                user_id: user?.id,
                type: "credit",
                amount: response?.intent.amount,
                transaction_type: "topup",
                data: {
                    payment_id: response?.intent.id,
                },
            };

            const pay = await postWithAxios("/api/save-wallet", dataToSend);

            setProcessing(false);

            toast(pay.message, {
                type: "success",
                hideProgressBar: true,
            });

            const url = "/" + user?.user_type + "/wallet";
            navigate(url);
        } else {
            setError(error);
            setProcessing(false);
            setOpen(false);
            toast("payment failed", {
                type: "error",
                hideProgressBar: true,
            });
        }

        // console.log(response);
    };

    return (
        <div className="flex w-full justify-center">
            <form onSubmit={handlePayment} id="stripeForm" className="w-full">
                <PaymentElement />
                <button className="btn btn-success my-4 w-full">
                    {processing ? (
                        <Loading type="spinner" color={"white"} />
                    ) : (
                        <span>
                            {" "}
                            Pay {appSettings?.currency}
                            {state.intent.amount}{" "}
                        </span>
                    )}
                </button>
            </form>
        </div>
    );
};
 */