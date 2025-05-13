"use client"

import {PostComponent} from "@/components/posts-related";
import {usePostDetails} from "@/lib/hooks";

export default function PostPage() {
    const {postWithRelations, isOwnerOfPost, isMounted, likesAmount, setLikesAmount} = usePostDetails()

    if (!isMounted) return null

    if (!postWithRelations && isMounted) return null

    return (
        <PostComponent likesAmount={likesAmount} setLikesAmount={setLikesAmount} likes isOwner={isOwnerOfPost}
                       post={postWithRelations}></PostComponent>
    )
}