"use client"

import {useEffect, useState} from "react";
import {API} from "@/lib/api-client/api";

export const useUserData = () => {
    const [email, setEmail] = useState("")
    const [changedUsername, setChangedUsername] = useState("")
    const [username, setUsername] = useState("")
    const [isInfoLoading, setIsInfoLoading] = useState(true)

    function truncate(text: string, maxLength: number): string {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    useEffect(() => {
        const getUser = async () => {
            setIsInfoLoading(true)

            const user = await API.getUserInfo.getUserInfo()

            const validatedUsername = truncate(user.username!, 10)
            setChangedUsername(validatedUsername)

            setUsername(user.username!)
            setEmail(user.email)

            setIsInfoLoading(false);
        }

        getUser()
    }, [])

    return {
        email,
        username,
        isInfoLoading,
        setUsername,
        setChangedUsername,
        changedUsername,
    }
}