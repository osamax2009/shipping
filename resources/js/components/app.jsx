import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./userInterface";
import Login from "./userInterface/login";
import Register from "./userInterface/register";
import { UserContextProvider } from "./contexts/userContext";
import PlaceOrder from "./userInterface/userDashboard/placeOrder";
import CountriesAndCities from "./adminInterface/countriesAndCities";
import Profile from "./userInterface/userDashboard/profile";
import UpdatePassword from "./userInterface/userDashboard/changePassword";
import AdminDashboardLayout from "./adminInterface/layout";
import Country from "./adminInterface/country";
import City from "./adminInterface/city";
import Orders from "./adminInterface/orders";
import ParcelTypes from "./adminInterface/parcelTypes";
import MyOrders from "./userInterface/userDashboard/myOrders";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SingleOrder from "./adminInterface/singleOrder";
import AdminCreateOrder from "./adminInterface/createOrder";
import UserDashboardLayout from "./userInterface/userDashboard/layout";

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
                path : "createorder",
                element : <PlaceOrder />
            },
            {
                path: "orderdetail/order_Id/:order_Id",
                element: <SingleOrder />,
            },

            {
                path: "countries-cities",
                element: <CountriesAndCities />,
            },

            {
                path: "order-list",
                element: <MyOrders />,
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
                path: "/admin/createorder",
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
                path: "/admin/orderdetail/order_Id/:order_Id",
                element: <SingleOrder />,
            },
        ],
    },
]);

if (document.getElementById("root")) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));
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
