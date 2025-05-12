"use client"

import {Input} from "@/components/ui-components/ui/input";
import {cn} from "@/lib/utils";
import {SendHorizonalIcon} from "lucide-react";

interface Props {
    className?: string
}

export const CommentInput = ({className}: Props) => {
    return (
        <div className={"relative"}>
            <Input className={cn("mt-4 px-3 py-5 min-w-[300px]", className)}
                   placeholder="Add your comment..."/>
            <div
                className={cn("absolute top-5.5 right-2 bg-blue-600 rounded-full p-2 text-white cursor-pointer text-sm", className)}>
                <SendHorizonalIcon className={"w-4 h-4"}></SendHorizonalIcon></div>
        </div>
    )
}