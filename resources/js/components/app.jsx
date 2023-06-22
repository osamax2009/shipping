import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./userInterface";
import Login from "./userInterface/login";
import Register from "./userInterface/register";
import { UserContextProvider } from "./contexts/userContext";
import PlaceOrder from "./userInterface/userDashboard/placeOrder";
import CountriesAndCities from "./adminInterface/countriesAndCities";
import OrderResume from "./userInterface/userDashboard/orderResume";
import Profile from "./userInterface/userDashboard/profile";
import UpdatePassword from "./userInterface/userDashboard/changePassword";
import AdminDashboardLayout from "./adminInterface/layout";
import { Loading } from "@nextui-org/react";
import Country from "./adminInterface/country";
import City from "./adminInterface/city";
import Orders from "./adminInterface/orders";
import ParcelTypes from "./adminInterface/parcelTypes";
import MyOrders from "./userInterface/userDashboard/myOrders";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SingleOrder from "./adminInterface/singleOrder";

const router = createBrowserRouter([
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

   /*  {
        path: "/account/dashboard/place-new-order",
        element: <PlaceOrder />,
    }, */

    {
        path: "/account/dashboard/new-order-resume",
        element: <OrderResume />,
    },

    {
        path: "/account/dashboard/countries-cities",
        element: <CountriesAndCities />,
    },

    {
        path: "/account/dashboard/user-profile",
        element: <Profile />,
    },

    {
        path: "/account/dashboard/order-list",
        element : <MyOrders/>
    },

    /* Admin routes */

    {
        path: "/admin",
        element: <AdminDashboardLayout />,
        //loader: <Loading />,
        children: [
            {
                path : "country",
                element : <Country />
            },

            {
                path : "city",
                element : <City />
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
                path : "/admin/orderdetail/order_Id/:order_Id",
                element : <SingleOrder />
            }
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
