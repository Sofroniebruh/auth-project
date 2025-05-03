"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {EditIcon} from "lucide-react";
import {useState} from "react";

interface Props {
    className?: string;
}

export const ChangableAvatarComponent = ({className}: Props) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    }

    return (
        <div onMouseEnter={handleHover} onMouseLeave={handleHover}
             className={"w-fit relative rounded-full overflow-hidden"}>
            <Avatar className={cn("w-[70px] h-[70px] bg-gray-400", className)}>
                <AvatarImage src="#"/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div
                className={cn("w-full h-full bg-gray-200 flex items-center justify-center cursor-pointer top-0 left-0", isHovered ? "absolute" : "hidden")}>
                <EditIcon></EditIcon></div>
        </div>
    )
}