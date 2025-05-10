import {useEffect, useState} from "react";
import {Post} from "@prisma/client";
import {API} from "@/lib/api-client/api";

export const useTagPosts = (tagType: "created" | "commented" | "liked") => {
    const [posts, setPosts] = useState<Post[] | []>([]);
    const [loading, setLoading] = useState(true);

    const fetchers = {
        created: () => API.getUserInfo.getAllPostsCreatedByUser(),
        liked: () => API.getUserInfo.getAllPostsLikedByUser(),
        commented: () => API.getUserInfo.getAllPostsCommentedByUser(),
    }

    const fetchPosts = async () => {
        setLoading(true);
        if (!tagType || !fetchers[tagType]) return;
        const {posts} = await fetchers[tagType]();
        setPosts(posts)
        setLoading(false);
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return {
        loading,
        posts,
    }
}