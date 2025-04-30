"use client"

import {useEffect, useState} from "react";
import {API} from "@/lib/api-client/api";

export const useIsAuthenticated = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const res = await API.tokenCheck.checkToken()
            setIsLoggedIn(res)
        }

        checkAuth();
    }, [])

    return {
        isLoggedIn,
    }
}