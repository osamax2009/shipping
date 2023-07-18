import React, { useState } from "react";
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
import { useLocation } from "react-router-dom";
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

const stripePromise = loadStripe(publishable_key);

const StripePayment = ({ open, setOpen, getWallet }) => {
    
   
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
    

    return (
        <Elements stripe={stripePromise} options={options}>
            <StripePaymentForm
                open={open}
                setOpen={setOpen}
                getWallet={getWallet}
            />
        </Elements>
    );
};

export default StripePayment;

const StripePaymentForm = ({ open, setOpen, getWallet }) => {
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState();
    const [processing, setProcessing] = useState(false);
    const location = useLocation();
    const state = location.state;

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
            setOpen(false);

            toast(pay.message, {
                type: "success",
                hideProgressBar: true,
            });

            getWallet();
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
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header></Modal.Header>
            <Modal.Body>
                <div className="flex w-full justify-center">
                    <form
                        onSubmit={handlePayment}
                        id="stripeForm"
                        className="w-full"
                    >
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
            </Modal.Body>
        </Modal>
    );
};
