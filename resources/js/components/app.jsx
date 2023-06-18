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
        path : "/account/register",
        element : <Register />
    },

    {
        path : "/account/dashboard/place-new-order",
        element : <PlaceOrder />
    },

    {
        path : "/account/dashboard/new-order-resume",
        element : <OrderResume />
    },

    {
        path : '/account/dashboard/countries-cities',
        element : <CountriesAndCities/>
    },

    {
        path : "/account/dashboard/user-profile",
        element : <Profile />
    },

]);

if (document.getElementById("root")) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));
    Index.render(
        <UserContextProvider>
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        </UserContextProvider>
    );
}
