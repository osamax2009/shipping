import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./userInterface";
import Login from "./userInterface/login";
import Register from "./userInterface/register";
import { UserContextProvider } from "./contexts/userContext";
import AdminDashboardLayout from "./adminInterface/layout";
import Country from "./adminInterface/country";
import City from "./adminInterface/city";
import Orders from "./adminInterface/orders";
import ParcelTypes from "./adminInterface/parcelTypes";
import MyOrders from "./userInterface/userDashboard/myOrders";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SingleOrder from "./adminInterface/singleOrder";
import AdminCreateOrder from "./partials/createOrder";
import UserDashboardLayout from "./userInterface/userDashboard/layout";
import BankProfil from "./partials/updateBankProfil";
import DeliveryManDashboard from "./deliveryManInterface/deliveryManDashboardLayout";
import Brand from "./userInterface/pagesPartials/index/brand";
import PrivacyAndPolicy from "./partials/privacyAndPolicy";
import AboutUs from "./partials/aboutUs";
import Wallet from "./partials/wallet";
import ContactUs from "./partials/contactUs";
import EarnHistory from "./deliveryManInterface/earnHistory";
import Drafts from "./deliveryManInterface/drafts";
import VerifyDocument from "./deliveryManInterface/verifyDocument";
import Payment from "./partials/payment";
import ExtraCharges from "./adminInterface/extarCharges";
import Vehicle from "./adminInterface/vehicle";
import PaymentGateway from "./adminInterface/paymentGateway";
import Document from "./adminInterface/document";
import DeliveryManDocument from "./adminInterface/deliveryManDocument";
import Users from "./adminInterface/users";
import AppSettings from "./adminInterface/appSettings";
import WithdrawRequest from "./adminInterface/withdrawRequestList";
import DeliveryPerson from "./adminInterface/deliveryPerson";
import { AppSettingsContextProvider } from "./contexts/appSettings";
import Dashboard from "./adminInterface/dashboard";
import PaymentSetup from "./adminInterface/paymentSetup";
import Stripe from "./adminInterface/paymentGateway/stripe";
import Razorpay from "./adminInterface/paymentGateway/razorpay";
import Paystack from "./adminInterface/paymentGateway/paystack";
import Flutterwave from "./adminInterface/paymentGateway/flutterwave";
import Paypal from "./adminInterface/paymentGateway/paypal";
import Paytabs from "./adminInterface/paymentGateway/paytabs";
import Mercadopago from "./adminInterface/paymentGateway/mercadopago";
import Paytm from "./adminInterface/paymentGateway/paytm";
import Myfatoorah from "./adminInterface/paymentGateway/myfatoorah";
import ViewUser from "./adminInterface/viewUser";
import TermAndCondition from "./partials/termAndCondition";
import AllNotifications from "./adminInterface/allNotifications";
/* import StripePayment from "./partials/stripePayment"; */
import Profile from "./partials/profile";
import NotFoundPage from "./partials/404";

const router = createBrowserRouter([
    /*   Common routes */
    {
        path: "/",
        element: <Index />,
    },

    {
        path: "/account/sign-in",
        element: <Login />,
    },

    {
        path: "/account/register",
        element: <Register />,
    },

    {
        path: "/privacypolicy",
        element: <PrivacyAndPolicy />,
    },

    {
        path: "/term&condition",
        element: <TermAndCondition />,
    },

    {
        path: "/aboutus",
        element: <AboutUs />,
    },

    {
        path: "/contactus",
        element: <ContactUs />,
    },

    /*   Common routes */

    /*  User routes */

    {
        path: "/client",
        element: <UserDashboardLayout />,

        children: [
            {
                path: "profile",
                element: <Profile />,
            },

            {
                path: "wallet",
                element: <Wallet />,
            },

           /*  {
                path : "wallet/stripePayment",
                element  : <StripePayment />
            }, */

           /*  {
                path: "payment/stripe",
                element: <StripePayment />,
            }, */

            {
                path: "createorder",
                element: <AdminCreateOrder />,
            },
            {
                path: "orderdetail/order_Id/:order_Id",
                element: <SingleOrder />,
            },

            {
                path: "order-list",
                element: <MyOrders />,
            },

            {
                path: "bank-informations",
                element: <BankProfil />,
            },

            {
                path: "payment",
                element: <Payment />,
            },
            {
                path: "notifications",
                element: <AllNotifications />,
            },
        ],
    },

    /*  Delivery Man routes */

    {
        path: "/delivery_man",
        element: <DeliveryManDashboard />,
        children: [
            {
                path: "profile",
                element: <Profile />,
            },

            {
                path: "order-list",
                element: <Orders />,
            },

            {
                path: "wallet",
                element: <Wallet />,
            },

           /*  {
                path : "wallet/stripePayment",
                element  : <StripePayment />
            }, */

            {
                path: "earning-history",
                element: <EarnHistory />,
            },

            {
                path: "drafts",
                element: <Drafts />,
            },

            {
                path: "verify-document",
                element: <VerifyDocument />,
            },

            {
                path: "createorder",
                element: <AdminCreateOrder />,
            },

            {
                path: "orderdetail/order_Id/:order_Id",
                element: <SingleOrder />,
            },

            {
                path: "payment",
                element: <Payment />,
            },

            {
                path: "notifications",
                element: <AllNotifications />,
            },
        ],
    },

    /* Admin routes */

    {
        path: "/admin",
        element: <AdminDashboardLayout />,
        //loader: <Loading />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },

            {
                path: "profile",
                element: <Profile />,
            },

            {
                path: "country",
                element: <Country />,
            },

            {
                path: "city",
                element: <City />,
            },

            {
                path: "createorder",
                element: <AdminCreateOrder />,
            },

            {
                path: "orders",
                element: <Orders />,
            },

            {
                path: "parcel-types",
                element: <ParcelTypes />,
            },

            {
                path: "extracharges",
                element: <ExtraCharges />,
            },

            {
                path: "vehicle",
                element: <Vehicle />,
            },

            {
                path: "wallet",
                element: <Wallet />,
            },

           /*  {
                path : "wallet/stripePayment",
                element  : <StripePayment />
            }, */

            {
                path: "paymentgateway",
                element: <PaymentGateway />,
            },

            {
                path: "paymentsetup",
                element: <PaymentSetup />,
            },

            {
                path: "paymentsetup/payment_type/stripe",
                element: <Stripe />,
            },
            {
                path: "paymentsetup/payment_type/razorpay",
                element: <Razorpay />,
            },

            {
                path: "paymentsetup/payment_type/paystack",
                element: <Paystack />,
            },

            {
                path: "paymentsetup/payment_type/flutterwave",
                element: <Flutterwave />,
            },

            {
                path: "paymentsetup/payment_type/paypal",
                element: <Paypal />,
            },

            {
                path: "paymentsetup/payment_type/paytabs",
                element: <Paytabs />,
            },

            {
                path: "paymentsetup/payment_type/mercadopago",
                element: <Mercadopago />,
            },

            {
                path: "paymentsetup/payment_type/paytm",
                element: <Paytm />,
            },

            {
                path: "paymentsetup/payment_type/myfatoorah",
                element: <Myfatoorah />,
            },

            {
                path: "documents",
                element: <Document />,
            },

            {
                path: "deliverypersondocuments",
                element: <DeliveryManDocument />,
            },

            {
                path: "deliverypersondocuments/delivery_man_id/:delivery_man_id",
                element: <DeliveryManDocument />,
            },

            {
                path: "users",
                element: <Users />,
            },

            {
                path: "users/user_Id/:user_Id",
                element: <ViewUser />,
            },

            {
                path: "users",
                element: <Users />,
            },

            {
                path: "deliverypersons",
                element: <DeliveryPerson />,
            },
            {
                path: "withdraw",
                element: <WithdrawRequest />,
            },

            {
                path: "appsetting",
                element: <AppSettings />,
            },

            {
                path: "orderdetail/order_Id/:order_Id",
                element: <SingleOrder />,
            },

            {
                path: "notifications",
                element: <AllNotifications />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

if (document.getElementById("page-top")) {
    const Index = ReactDOM.createRoot(document.getElementById("page-top"));
    Index.render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <UserContextProvider>
                <AppSettingsContextProvider>
                    <React.StrictMode>
                        <RouterProvider router={router} />
                    </React.StrictMode>
                </AppSettingsContextProvider>
            </UserContextProvider>
        </LocalizationProvider>
    );
}
