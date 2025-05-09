import {LoaderCircleIcon} from "lucide-react";
import * as React from "react";
import {cn} from "@/lib/utils";

interface Props {
    className?: string
}

export const Loading = ({className}: Props) => {
    return (
        <div className={cn("flex justify-center items-center w-full min-h-[300px]", className)}>
            <LoaderCircleIcon className="w-15 h-15 sm:w-25 sm:h-25 animate-spin"/>
        </div>
    )
}