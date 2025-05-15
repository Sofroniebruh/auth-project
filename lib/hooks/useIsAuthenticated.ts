"use client"

import {useEffect, useState} from "react";
import {API} from "@/lib/api-client/api";

export const useIsAuthenticated = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            const {loggedIn} = await API.tokenCheck.checkToken()
            setIsLoggedIn(loggedIn)
            setLoading(false);
        }

        checkAuth();
    }, [])

    return {
        isLoggedIn,
        loading,
    }
}