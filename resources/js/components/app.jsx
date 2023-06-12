import React from "react";
import ReactDOM from "react-dom/client";
import DashboardLayout from "./dashboardComponents/dashbboardLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./userInterface";
import Login from "./userInterface/login";
import { UserContextProvider } from "./contexts/userContext";
import UserDashboard from "./userInterface/userDashboard/userDashboard";
import PlaceOrder from "./userInterface/userDashboard/placeOrder";
import CountriesAndCities from "./adminInterface/countriesAndCities";

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
        path: "/account/dashboard",
        element: <UserDashboard />
    },

    {
        path : "/account/dashboard/place-new-order",
        element : <PlaceOrder />
    },

    {
        path : '/account/dashboard/countries-cities',
        element : <CountriesAndCities/>
    }
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
