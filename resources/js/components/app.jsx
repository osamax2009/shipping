import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./userInterface";
import Login from "./userInterface/login";
import Register from "./userInterface/register";
import { UserContextProvider } from "./contexts/userContext";
import PlaceOrder from "./userInterface/userDashboard/placeOrder";
import Profile from "./userInterface/userDashboard/profile";
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
        path : "/privacypolicy",
        element : <PrivacyAndPolicy />
    },

    {
        path : "/aboutus",
        element : <AboutUs />
    },

    {
        path : "/contactus",
        element : <ContactUs />
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

            
        ],
    },

    /*  Delivery Man routes */

    {
        path: "/delivery_man",
        element: <DeliveryManDashboard />,
        children: [
            {
                path: "order-list",
                element: <Orders />,
            },

            {
                path: "wallet",
                element: <Wallet />,
            }, 

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
                path : "createorder",
                element : <AdminCreateOrder />
            },

            {
                path: "orderdetail/order_Id/:order_Id",
                element: <SingleOrder />,
            },

            {
                path : "payment",
                element : <Payment />
            }
        ],
    },
    /* Admin routes */

    {
        path: "/admin",
        element: <AdminDashboardLayout />,
        //loader: <Loading />,
        children: [
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
                path: "orderdetail/order_Id/:order_Id",
                element: <SingleOrder />,
            },
        ],
    },
]);

if (document.getElementById("page-top")) {
    const Index = ReactDOM.createRoot(document.getElementById("page-top"));
    Index.render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <UserContextProvider>
                <React.StrictMode>
                    <RouterProvider router={router} />
                </React.StrictMode>
            </UserContextProvider>
        </LocalizationProvider>
    );
}
