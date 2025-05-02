import {TabsComponent, TabsContent, TabsTrigger} from "@/components/common/tabs-component";
import {LikedPostsComponent} from "@/components/general/liked-posts-component";
import {CommentedPostsComponent} from "@/components/general/commented-posts";

export const ProfileTabsComponent = () => {
    const tabs: TabsTrigger[] = [
        {
            name: "Liked",
            value: "liked",
        },
        {
            name: "Commented",
            value: "commented",
        }
    ]

    const content: TabsContent[] = [
        {
            value: "liked",
            content: <LikedPostsComponent></LikedPostsComponent>
        },
        {
            value: "commented",
            content: <CommentedPostsComponent></CommentedPostsComponent>
        }
    ]

    return (
        <TabsComponent tabs={tabs} content={content}
                       mainClassName={"w-full flex flex-col items-center justify-center"}></TabsComponent>
    )
}