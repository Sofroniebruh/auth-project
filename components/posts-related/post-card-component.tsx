"use client"

import {HeartIcon, ShareIcon} from "lucide-react";
import {useIsAuthenticated} from "@/lib/hooks";
import {toast} from "sonner";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui-components/ui/skeleton";

export const PostCardComponent = ({image}: { image: string }) => {
    const {isLoggedIn} = useIsAuthenticated()
    const [isLoaded, setIsLoaded] = useState(false);
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            const ratio = img.naturalWidth / img.naturalHeight;
            setAspectRatio(ratio);
            setIsLoaded(true);
        };
    }, [image]);

    const handleLike = () => {
        if (isLoggedIn) {
            console.log("like");

            return;
        }

        toast("Log In to like")
    }

    return (
        <div className={"break-inside-avoid rounded-lg shadow-sm overflow-hidden relative"}>
            {isLoaded ? (
                <img
                    src={image}
                    alt={"cube image"}
                    className="w-full h-auto rounded-lg"
                />
            ) : aspectRatio ? (
                <div
                    className="w-full bg-gray-200 animate-pulse rounded-lg"
                    style={{aspectRatio: `${1 / aspectRatio}`}}
                />
            ) : (
                <Skeleton className="w-full aspect-[3/4]"/>
            )}
            <div className={"absolute bottom-5 right-5"}>
                <div className={"flex items-center gap-2.5"}>
                    <div className={"rounded-full bg-white p-2 cursor-pointer hover:bg-white/70"}>
                        <ShareIcon size={20}></ShareIcon>
                    </div>
                    <div onClick={handleLike} className={"rounded-full bg-white p-2 cursor-pointer hover:bg-white/70"}>
                        <HeartIcon size={20}></HeartIcon>
                    </div>
                </div>
            </div>
        </div>
    )
}