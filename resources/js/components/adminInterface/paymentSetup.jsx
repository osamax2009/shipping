import { Button, Image, Radio } from "@nextui-org/react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { getWithAxios, postWithAxios } from "../api/axios";
import { toast } from "react-toastify";

const PaymentSetup = ({children}) => {
   
    const navigate = useNavigate();

    const gateways = [
        {
            method: {
                label: "Stripe",
                value: "stripe",
            },

            fields: [
                {
                    label: "Secret Key",
                    value: "secret_key",
                },
                {
                    label: "Publishable key",
                    value: "publishable_key",
                },
            ],
        },
        {
            method: {
                label: "Razorpay",
                value: "razorpay",
            },

            fields: [
                {
                    label: "Key Id",
                    value: "key_id",
                },
                {
                    label: "Publishable key",
                    value: "publishable_key",
                },
            ],
        },

        {
            method: {
                label: "PayStack",
                value: "paystack",
            },

            fields: [
                {
                    label: "Public Key",
                    value: "public_key",
                },
            ],
        },

        {
            method: {
                label: "FlutterWave",
                value: "flutterwave",
            },

            fields: [
                {
                    label: "Public Key",
                    value: "public_key",
                },
                {
                    label: "Secret key",
                    value: "secret_key",
                },

                {
                    label: "Encryption key",
                    value: "encryption_key",
                },
            ],
        },

        {
            method: {
                label: "PayPal",
                value: "paypal",
            },

            fields: [
                {
                    label: "Tokenization key",
                    value: "tokenization_key",
                },
            ],
        },

        {
            method: {
                label: "PayTabs",
                value: "paytabs",
            },

            fields: [
                {
                    label: "Profil Id",
                    value: "profil_id",
                },
                {
                    label: "Server key",
                    value: "server_key",
                },

                {
                    label: "Client key",
                    value: "client_key",
                },
            ],
        },

        {
            method: {
                label: "Mercado pago",
                value: "mercadopago",
            },

            fields: [
                {
                    label: "Public Key",
                    value: "public_key",
                },
                {
                    label: "Access Token",
                    value: "access_token",
                },
            ],
        },

        {
            method: {
                label: "Paytm",
                value: "paytm",
            },

            fields: [
                {
                    label: "MID",
                    value: "mid",
                },
                {
                    label: "Merchant Key",
                    value: "merchant_key",
                },
            ],
        },

        {
            method: {
                label: "My Fatoorah",
                value: "myfatoorah",
            },

            fields: [
                {
                    label: "Token",
                    value: "token",
                },
            ],
        },
    ];

    const navigateBack = () => {
        navigate("/admin/paymentgateway");
    };

    return (
        <div className="relative">
            <div className="absolute top-5 right-3">
                <Button
                    auto
                    color={"secondary"}
                    size={"lg"}
                    onPress={navigateBack}
                >
                    <div className="font-bold text-lg">back</div>
                </Button>
            </div>
            <div className="flex flex-wrap w-3/4 gap-6 font-bold text-lg">
                {gateways.map((gateway, index) => (
                    <GatewayLink gateway={gateway} key={index} />
                ))}
            </div>

            <div className="flex w-full justify-center pt-8 pb-4">
                {children}
            </div>
        </div>
    );
};

export default PaymentSetup;


const GatewayLink = ({ gateway }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const url = "/admin/paymentsetup/payment_type/" + gateway.method.value;

    const goTo = () => {
        navigate(url);
    };

    return (
        <button
            onClick={goTo}
            className={
                url == path
                    ? "py-2 px-4 bg-appGreen text-white rounded-lg"
                    : "py-2 px-4 bg-gray-300 text-black rounded-lg"
            }
        >
            {gateway.method.label}
        </button>
    );
};
