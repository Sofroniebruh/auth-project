import {useCallback, useEffect, useState} from "react";
import {API} from "@/lib/api-client/api";
import {toast} from "sonner";
import {useDropzone} from "react-dropzone";

export const useHandleImageDropZone = () => {
    const [openState, setOpenState] = useState<boolean>();
    const [isLoading, setIsLoading] = useState(true);
    const [profilePicture, setProfilePicture] = useState("");

    const fetchUserImage = async () => {
        setIsLoading(true)
        const image = await API.getImages.GetProfileImage()

        if (image) {
            setProfilePicture(image)
        }
    }

    useEffect(() => {
        fetchUserImage()
    }, [])

    const onDrop = useCallback((acceptedFile: File[]) => {
        setOpenState(false);
        setIsLoading(true);
        const file: File = acceptedFile[0];

        handleImage(file)
    }, [])

    const handleImage = async (file: File) => {
        const link = await API.uploadImage.UploadPublicImagePfp(file)
        if (link) {
            setProfilePicture(link)
            toast("Image uploaded successfully")

            return
        }

        toast("Image upload failed")
        setIsLoading(false);
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return {
        getRootProps,
        getInputProps,
        setIsLoading,
        isDragActive,
        openState,
        isLoading,
        profilePicture,
    }
}