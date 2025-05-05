import {useEffect, useState} from "react";
import {API} from "@/lib/api-client/api";
import {User} from "@prisma/client";

export type GetUserInfo = {
    user: User;
}

export const useUserData = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [isInfoLoading, setIsInfoLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            setIsInfoLoading(true)

            const {user} = (await API.getUserInfo.GetUserEmailAndUsername()) as GetUserInfo

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
    }
}