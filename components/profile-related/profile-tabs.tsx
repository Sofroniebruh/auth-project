import {TabsComponent, TabsContent, TabsTrigger} from "@/components/common/tabs-component";
import {LikedPostsComponent} from "@/components/profile-related/liked-posts-component";
import {CommentedPostsComponent} from "@/components/profile-related/commented-posts";
import {CreatedPostsComponent} from "@/components/profile-related/created-posts";

export const ProfileTabsComponent = () => {
    const tabs: TabsTrigger[] = [
        {
            name: "Liked",
            value: "liked",
        },
        {
            name: "Commented",
            value: "commented",
        },
        {
            name: "Created",
            value: "created",
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
        },
        {
            value: "created",
            content: <CreatedPostsComponent></CreatedPostsComponent>
        }
    ]

    return (
        <TabsComponent tabs={tabs} content={content}
                       mainClassName={"w-full flex flex-col items-center justify-center"}></TabsComponent>
    )
}