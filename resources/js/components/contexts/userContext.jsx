import {createContext, useEffect, useMemo, useState } from "react";
import { getCsrfToken, getWithAxios } from "../api/axios";


export const UserContext = createContext()


export const UserContextProvider = ({children}) => {

    const [user, setUser] =useState()

    const context = {user, setUser}

    const contextMemo = useMemo(() => context,[user])

    const getUser = async () => {
        
        const user = await getWithAxios('/api/user')
         setUser(user)
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