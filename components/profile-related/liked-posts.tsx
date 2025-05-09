"use client"

import {PostCardComponent} from "@/components/posts-related";
import * as React from "react";
import {MasonryLayout} from "@/components/common/masonry-layout";
import {useTagPosts} from "@/lib/hooks/useTagPosts";
import {Loading, NoPosts} from "@/components/profile-related/shared";

export const LikedPosts = () => {
    const {posts, loading} = useTagPosts("liked")

    if (loading) {
        return (
            <Loading></Loading>
        )
    }

    if (posts.length === 0 && !loading) {
        return (
            <NoPosts text={"Nothing is to your liking yet..."}></NoPosts>
        )
    }

    return (
        <MasonryLayout>
            {
                posts.length > 0 && (
                    posts.map((post, index) => (
                        <PostCardComponent key={index} image={post.postImageUrl}/>
                    ))
                )
            }
        </MasonryLayout>
    )
}