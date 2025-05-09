"use client"

import * as React from "react";
import {PostCardComponent} from "@/components/posts-related";
import {MasonryLayout} from "@/components/common/masonry-layout";
import {useTagPosts} from "@/lib/hooks/useTagPosts";
import {Loading, NoPosts} from "@/components/profile-related/shared";

export const CreatedPostsComponent = () => {
    const {posts, loading} = useTagPosts("created")

    if (loading) {
        return (
            <Loading></Loading>
        )
    }

    if (posts.length === 0 && !loading) {
        return (
            <NoPosts text={"No posts created..."}></NoPosts>
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