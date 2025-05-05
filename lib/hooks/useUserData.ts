import {useEffect, useState} from "react";
import {API} from "@/lib/api-client/api";
import {User} from "@prisma/client";

export type GetUserInfo = {
    user: User;
}

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

            const {user} = (await API.getUserInfo.GetUserEmailAndUsername()) as GetUserInfo

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