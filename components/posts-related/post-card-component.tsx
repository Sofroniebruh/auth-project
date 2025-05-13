"use client"

import {HeartIcon, ShareIcon} from "lucide-react";
import {useIsAuthenticated} from "@/lib/hooks";
import {toast} from "sonner";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui-components/ui/skeleton";
import {API} from "@/lib/api-client/api";
import Link from "next/link";
import {cn} from "@/lib/utils";

interface Props {
    image: string,
    id: number,
}

export const PostCardComponent = ({image, id}: Props) => {
    const {isLoggedIn} = useIsAuthenticated()
    const [isLoaded, setIsLoaded] = useState<boolean>();
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            const ratio = img.naturalWidth / img.naturalHeight;
            setAspectRatio(ratio);
            setIsLoaded(true);
        };
    }, [image]);

    const handleLike = async (id: number) => {
        if (!isLoggedIn) {
            toast("Log In to like")
            return;
        }

        const res = await API.posts.likePost(id)

        if (res === 200) {
            setIsLiked(false)
        } else if (res === 201) {
            setIsLiked(true)
        } else {
            toast("Failed to like post")
        }
    }

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
                    <div onClick={() => handleLike(id)}
                         className={"rounded-full bg-white p-2 cursor-pointer hover:bg-white/70"}>
                        <HeartIcon size={20} className={cn(isLiked ? "fill-red-600 text-red-600" : "")}></HeartIcon>
                    </div>
                </div>
            </div>
        </div>
    )
}