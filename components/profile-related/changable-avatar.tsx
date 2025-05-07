"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui-components/ui/avatar";
import {cn} from "@/lib/utils";
import {EditIcon, LoaderCircleIcon} from "lucide-react";
import {DialogComponent} from "@/components/common/dialog-component";
import {DragAndDropImageComponent} from "@/components/common/drag-and-drop-image-component";
import {useHandleImageDropZone} from "@/lib/hooks/useHandleImageDropZone";

interface Props {
    className?: string;
    email?: string;
}

export const ChangableAvatarComponent = ({className, email}: Props) => {
    const {
        isLoading,
        profilePicture,
        openState,
        getInputProps,
        isDragActive,
        getRootProps,
        setIsLoading
    } = useHandleImageDropZone({isPfp: true});

    return (
        <div className={"w-fit relative rounded-full overflow-hidden group"}>
            <Avatar className={cn("w-[70px] h-[70px] bg-gray-400 overflow-hidden", className)}>
                <AvatarImage className={"object-cover w-full h-full"} onError={() => setIsLoading(false)}
                             onLoad={() => setIsLoading(false)}
                             src={profilePicture}/>
                <AvatarFallback>{email ? email.slice(0, 2) : <p>C</p>}</AvatarFallback>
            </Avatar>
            <div
                className={cn(
                    "w-full h-full bg-gray-200 absolute flex items-center justify-center cursor-pointer top-0 left-0 ", "opacity-0 group-hover:opacity-100",
                    {
                        "hidden": isLoading,
                    }
                )}
            >
                <DialogComponent openState={openState} triggerButton={
                    <EditIcon className={"cursor-pointer"}></EditIcon>
                } title={"Change profile picture"}>
                    <DragAndDropImageComponent isDragActive={isDragActive} getInputProps={getInputProps}
                                               getRootProps={getRootProps}></DragAndDropImageComponent>
                </DialogComponent>
            </div>
            {isLoading && (
                <div
                    className={cn("w-full h-full absolute bg-gray-200 flex items-center justify-center cursor-pointer top-0 left-0")}>
                    <LoaderCircleIcon className={"animate-spin"}></LoaderCircleIcon>
                </div>
            )}
        </div>
    )
}