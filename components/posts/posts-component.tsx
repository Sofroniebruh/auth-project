import {PostCardComponent} from "@/components/posts/post-card-component";

export const PostsComponent = () => {
    return (
        <div className={"columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4"}>
            <PostCardComponent
                image={"https://i.pinimg.com/736x/19/23/12/19231243afa31f9a964f9526211e01d5.jpg"}></PostCardComponent>
            <PostCardComponent
                image={"https://i.pinimg.com/736x/19/23/12/19231243afa31f9a964f9526211e01d5.jpg"}></PostCardComponent>
            <PostCardComponent
                image={"https://i.pinimg.com/736x/d2/6e/c2/d26ec291b6da27ad015394bfdf902d1f.jpg"}></PostCardComponent>
            <PostCardComponent
                image={"https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}></PostCardComponent>
            <PostCardComponent
                image={"https://i.pinimg.com/736x/2c/2b/1c/2c2b1ca4e0dd3d517ca70f9e0b618cbf.jpg"}></PostCardComponent>
        </div>
    )
}


