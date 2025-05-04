"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {EditIcon, LoaderCircleIcon} from "lucide-react";
import {useState} from "react";
import {DialogComponent} from "@/components/common/dialog-component";
import {DragAndDropPfpComponent} from "@/components/common/drag-and-drop-pfp-component";
import {useHandleImageDropZone} from "@/lib/hooks/useHandleImageDropZone";

interface Props {
    className?: string;
}

export const ChangableAvatarComponent = ({className}: Props) => {
    const {isLoading, profilePicture, openState, getInputProps, isDragActive, getRootProps} = useHandleImageDropZone();
    const [isHovered, setIsHovered] = useState(false);

    const handleHoverIn = () => {
        setIsHovered(true);
    }

    const handleHoverOut = () => {
        setIsHovered(false);
    }

    return (
        <div onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}
             className={"w-fit relative rounded-full overflow-hidden"}>
            <Avatar className={cn("w-[70px] h-[70px] bg-gray-400", className)}>
                <AvatarImage src={profilePicture}/>
                <AvatarFallback>
                    {isLoading ? (
                        <LoaderCircleIcon className={"animate-spin"}></LoaderCircleIcon>
                    ) : (<p>CN</p>)
                    }
                </AvatarFallback>
            </Avatar>
            <div
                className={cn(
                    "w-full h-full bg-gray-200 flex items-center justify-center cursor-pointer top-0 left-0",
                    {
                        "absolute": isHovered,
                        "hidden": !isHovered || isLoading,
                    }
                )}
            >
                <DialogComponent openState={openState} triggerButton={
                    <EditIcon className={"cursor-pointer"}></EditIcon>
                } title={"Change profile picture"}>
                    <DragAndDropPfpComponent isDragActive={isDragActive} getInputProps={getInputProps}
                                             getRootProps={getRootProps}></DragAndDropPfpComponent>
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