"use client"

import {PostComponent} from "@/components/posts-related";
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {API} from "@/lib/api-client/api";
import {PostWithRelations} from "@/lib/helpers/helper-types-or-interfaces";

export default function PostPage() {
    const [postWithRelations, setPostWithRelations] = useState<PostWithRelations>();
    const params = useParams()
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const id = params.id as string;
    const router = useRouter()

    useEffect(() => {
        const fetchPost = async (id: string) => {
            setIsMounted(true);
            try {
                const {post} = await API.posts.getPost(id)

                if (post) {
                    setPostWithRelations(post)

                    return;
                }
            } catch (e) {
                if (e instanceof Error) {
                    console.log(e.message)
                    router.push("/")
                }

                console.log(e)
                router.push("/")
            }
        }

        fetchPost(id)
    }, [])

    console.log("Post", postWithRelations)

    if (!isMounted) return null

    if (!postWithRelations && isMounted) return null

    return (
        <PostComponent post={postWithRelations}></PostComponent>
    )
}