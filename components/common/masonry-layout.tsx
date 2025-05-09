import React from "react";
import Masonry from "react-masonry-css";
import {cn} from "@/lib/utils";

interface Props {
    children: React.ReactNode
    className?: string
}

export const MasonryLayout = ({children, className}: Props) => {
    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        640: 1,
    }

    return (
        <Masonry
            className={cn("flex gap-4", className)}
            columnClassName="space-y-4"
            breakpointCols={breakpointColumnsObj}>
            {children}
        </Masonry>
    )
}