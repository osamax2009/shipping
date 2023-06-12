import {createContext, useEffect, useMemo, useState } from "react";
import { getCsrfToken, getUserFromAPI, getWithAxios } from "../api/axios";


export const UserContext = createContext()


export const UserContextProvider = ({children}) => {

    const [user, setUser] =useState()

    const context = {user, setUser}

    const contextMemo = useMemo(() => context,[user])

    const getUser = async () => {
        
        const user = await getUserFromAPI()
        const res = user
         setUser(res)
    }


    useEffect(()=>{
        getUser()
    },[user])

    return(
        <UserContext.Provider value={contextMemo}>
            {children}
        </UserContext.Provider>
    )
}