import { createContext, useEffect, useMemo, useState } from "react";
import { getCsrfToken, getWithAxios } from "../api/axios";
import { ToastContainer } from "react-toastify";
import Loader from "../partials/loader";

export const AppSettingsContext = createContext();

export const AppSettingsContextProvider = ({ children }) => {
    const [appSettings, setAppSettings] = useState();

    const context = { appSettings, setAppSettings };

    const contextMemo = useMemo(() => context, [appSettings]);

    const getAppSettings = async () => {
        const res = await getWithAxios("/api/get-appsetting");
       setAppSettings(res)
    };

    useEffect(() => {
        getAppSettings();
    }, []);

   
        return (
            <AppSettingsContext.Provider value={contextMemo}>
               {children}
            </AppSettingsContext.Provider>
        );
    
};
