"use client"

import * as React from "react";
import {PostCardComponent} from "@/components/posts-related";
import {MasonryLayout} from "@/components/common/masonry-layout";
import {useTagPosts} from "@/lib/hooks/useTagPosts";
import {Loading, NoPosts} from "../posts-related/shared";

export const CreatedPostsComponent = () => {
    const {postsWithAction, loading} = useTagPosts("created")

    if (loading) {
        return (
            <Loading></Loading>
        )
    }

    if (postsWithAction.length === 0 && !loading) {
        return (
            <NoPosts text={"No posts created..."}></NoPosts>
        )
    }

    return (
        <MasonryLayout>
            {
                postsWithAction.length > 0 && (
                    postsWithAction.map((post, index) => (
                        <PostCardComponent id={post.id} key={index} image={post.postImageUrl}/>
                    ))
                )
            }
        </MasonryLayout>
    )
}