import {PostComponent} from "@/components/posts-related";

export default function PostPage({params}: { params: { id: string } }) {
    const {id} = params;

    return (
        <PostComponent id={id}></PostComponent>
    )
}