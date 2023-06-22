import { createContext, useEffect, useMemo, useState } from "react";
import { getCsrfToken, getUserFromAPI, getWithAxios } from "../api/axios";
import { ToastContainer } from "react-toastify";
import Loader from "../partials/loader";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    const [loading, setLoading] = useState(true);

    const context = { user, setUser };

    const contextMemo = useMemo(() => context, [user]);

    const getUser = async () => {
        const user = await getUserFromAPI();
        const res = user;
        setUser(res);
    };

    useEffect(() => {
        const loadData = async () => {
            getUser();
            await new Promise((r) => setTimeout(r, 2000));
            setLoading((loading) => !loading);
        };

        loadData();
    }, []);

    if (loading) {
        return <Loader />;
    } else {
        return (
            <UserContext.Provider value={contextMemo}>
                <ToastContainer />
                <div>{children}</div>
            </UserContext.Provider>
        );
    }
};
