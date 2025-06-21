'use client'

import { userDetailsType } from "@/lib/types/userTypes";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    user: userDetailsType | null;
    loggedIn: boolean;
    isLoaded: boolean;
    setUser: React.Dispatch<React.SetStateAction<userDetailsType | null>>;
    // setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    login: () => void;
    logout: () => void;
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ user, setUser ] = useState<userDetailsType | null>(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [ loggedIn, setLoggedIn ] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            setLoggedIn(localStorage.getItem('heckerOneUserLoggedIn') === 'true');
            setIsLoaded(true);
        }
    }, [])

    const login = () => {
        setLoggedIn(true);
        if (typeof window !== "undefined") {
            localStorage.setItem('heckerOneUserLoggedIn', 'true');
        }
    };

    const logout = () => {
        setLoggedIn(false);
        if (typeof window !== "undefined") {
            localStorage.setItem('heckerOneUserLoggedIn', 'false');
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, loggedIn, login, logout, isLoaded }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)

    if (!context){
        throw new Error("useUser must be used within UserContextProvider")
    }
    return context
}
