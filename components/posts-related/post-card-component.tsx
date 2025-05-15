"use client"

import {HeartIcon, ShareIcon} from "lucide-react";
import {useIsAuthenticated} from "@/lib/hooks";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui-components/ui/skeleton";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {toast} from "sonner";
import {useLikeStore} from "@/lib/store/likeStore";

interface Props {
    image: string,
    id: number,
}

export const PostCardComponent = ({image, id}: Props) => {
    const {isLoggedIn} = useIsAuthenticated()
    const {toggleLike, isLiked, likedPosts} = useLikeStore()

    const [isLoaded, setIsLoaded] = useState<boolean>();
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

    return (
        <div className={"break-inside-avoid rounded-lg shadow-sm overflow-hidden relative"}>
            {isLoaded ? (
                <Link href={`/posts/${id}`} className={"block"}>
                    <img
                        src={image}
                        alt={"cube image"}
                        className="w-full h-auto rounded-lg"
                    />
                </Link>
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
                    <div onClick={() => isLoggedIn ? toggleLike(id) : toast("Log In to like")}
                         className={"rounded-full bg-white p-2 cursor-pointer hover:bg-white/70"}>
                        <HeartIcon size={20} className={cn(isLiked(id) ? "fill-red-600 text-red-600" : "")}></HeartIcon>
                    </div>
                </div>
            </div>
        </div>
    )
}