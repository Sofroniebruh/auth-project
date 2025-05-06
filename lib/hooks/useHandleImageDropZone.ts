"use client"

import {useCallback, useEffect, useState} from "react";
import {API} from "@/lib/api-client/api";
import {toast} from "sonner";
import {useDropzone} from "react-dropzone";

interface Props {
    isPfp: boolean;
}

export const useHandleImageDropZone = ({isPfp}: Props) => {
    const [openState, setOpenState] = useState<boolean>();
    const [isLoading, setIsLoading] = useState(true);
    const [profilePicture, setProfilePicture] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>();

    const fetchUserImage = async () => {
        setIsLoading(true)
        const image = await API.getUserInfo.GetProfileImage()
        console.log("Image", image)

        if (image == null || image == "") {
            setIsLoading(false)

            return;
        }

        setProfilePicture(image)
    }

    useEffect(() => {
        fetchUserImage()
    }, [])

    const onDrop = useCallback((acceptedFile: File[]) => {
        setOpenState(false);
        setIsLoading(true);
        const file: File = acceptedFile[0];
        isPfp ? handleImage(file) : setUploadedFile(file);
    }, [])

    const handleImage = async (file: File) => {
        const link = await API.uploadImage.UploadPublicImage(file)
        if (link) {
            if (await API.changeUserInfo.changeUserPfp(link)) {
                setProfilePicture(link)
                toast("Image uploaded successfully")

                return
            }
        }

        toast("Image upload failed")
        setIsLoading(false);
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return {
        getRootProps,
        getInputProps,
        setIsLoading,
        setUploadedFile,
        uploadedFile,
        isDragActive,
        openState,
        isLoading,
        profilePicture,
    }
}