import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getWithAxios, postWithAxios } from "../api/axios";
import { useEffect } from "react";
import { Image } from "@nextui-org/react";
import { useContext } from "react";
import { AppSettingsContext } from "../contexts/appSettings";
import StripePaymentForm from "./stripePayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_test_51Lzc2NHoogcL4mgfk0PWSVUoNIL6594xgpkQQKtAZextrkEH7Yk2UTXukicZDPhkHIgUQ1hYNsrKimVG3qfo5piZ002WnIwWEz"
);

const Payment = () => {
    const [paymentMethods, setPaymentMethods] = useState();
    const [selectedGateway, setSelectedGateway] = useState();
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);
    const location = useLocation();
    const state = location.state;

    const options = {
        //clientSecret: selectedGateway ? selectedGateway?.test_value.secret_key : '',
        clientSecret: "{{CLIENT_SECRET}}",
        //  mode : "payment"
    };

    const getPaymentsMethods = async () => {
        const res = await getWithAxios("/api/paymentgateway-list");

        setPaymentMethods(res.data);
    };

    const savePayment = async () => {
        
        const dataToSend = {
            amount: state.paymentAmount,
            currency: appSettings?.currency_code,
        };

        const res = await postWithAxios("/api/paymentgateway-save", dataToSend);
    };

    useEffect(() => {
        getPaymentsMethods();
    }, []);
    return (
        <div>
            <div className="text-lg font-bold py-4">Payment methods</div>

            <div className="grid gap-4 md:grid-cols-3">
                {paymentMethods?.map((method, index) => (
                    <div
                        key={index}
                        onMouseDown={() => setSelectedGateway(method)}
                        className={
                            selectedGateway == method
                                ? "flex w-fit items-center p-4 gap-4 border border-green-600 rounded-xl cursor-pointer"
                                : "flex w-fit p-4 items-center  gap-4 border border-gray-400 rounded-xl cursor-pointer"
                        }
                    >
                        <Image
                            src={method.gateway_logo}
                            width={100}
                            height={70}
                            className="h-24"
                        />
                        <div className="font-bold">{method.title}</div>
                    </div>
                ))}
            </div>
            {selectedGateway?.type == "stripe" && (
                <div className="py-8">
                    <Elements stripe={stripePromise} options={options}>
                        <StripePaymentForm />
                    </Elements>
                </div>
            )}
        </div>
    );
};

export default Payment;
