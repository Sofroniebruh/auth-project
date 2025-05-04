import {useEffect, useState} from "react";
import {API} from "@/lib/api-client/api";

export const useUserProfilePicture = () => {
    const [profilePicture, setProfilePicture] = useState("")
    const [isLoading, setIsLoading] = useState<boolean>();

    const fetchUserImage = async () => {
        setIsLoading(true)
        const image = await API.getImages.GetProfileImage()

        if (image) {
            setProfilePicture(image)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchUserImage()
    }, [])

    return {
        profilePicture,
        setProfilePicture,
        isLoading,
        setIsLoading,
    }
}