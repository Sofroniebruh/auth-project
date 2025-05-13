"use client"

import {PostCardOpenedVersion} from "@/components/posts-related/post-card-opened-version";
import {ArrowLeftIcon, HeartIcon, ShareIcon} from "lucide-react";
import {Button} from "@/components/ui-components/ui/button";
import {Separator} from "@/components/ui/separator";
import {AvatarComponent, CommentInput, CommentsComponent, DialogComponent} from "@/components/common";
import {PostsComponent} from "@/components/posts-related/posts-component";
import {PostWithRelations} from "@/lib/helpers/helper-types-or-interfaces";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";

interface Props {
    post: PostWithRelations;
}

export const PostComponent = ({post}: Props) => {
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        window.scroll(0, 0)
    }, [pathname])

    return (
        <div className={"flex flex-col"}>
            <div className="px-5 sm:px-[80px] pt-10 sm:py-10">
                <div className="flex flex-col sm:flex-row justify-center gap-8">
                    <div
                        className="w-full sm:min-w-[240px] sm:max-w-[300px] md:max-w-[370px] xl:max-w-[400px] flex items-center justify-center relative">
                        <Button onClick={router.back} size={"lg"}
                                className={"absolute top-5 left-5 lg:top-0 lg:left-0 bg-blue-600 text-white hover:bg-blue-500 z-20"}><ArrowLeftIcon/> Back</Button>
                        <PostCardOpenedVersion
                            image={post.postImageUrl}/>
                    </div>
                    <div className="flex flex-col w-full lg md:w-[400px] md:mt-0 gap-4 min-h-0 justify-between">
                        <div className="flex flex-col gap-4">
                            <Link href={"#"}>
                                <div className="flex items-center gap-3">
                                    <AvatarComponent className={"w-9 h-9"} email={post.createdBy.email}
                                                     profilePicture={post.createdBy.pfpUrl}/>
                                    <h1 className="font-semibold text-lg">{post.createdBy.username}</h1>
                                </div>
                            </Link>
                            <div className="flex items-center gap-3">
                                <p className="font-semibold">{post.likes.length}</p>
                                <Button variant="outline">Like <HeartIcon/></Button>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline">Save <ShareIcon/></Button>
                                </div>
                            </div>
                            <Separator/>
                        </div>

                        <div className={"flex lg:hidden w-full h-full items-center justify-center"}>
                            <DialogComponent className={"flex flex-col justify-center items-center"} triggerButton={
                                <div
                                    className={"bg-blue-600 hover:bg-blue-500 text-white rounded-md p-2 text-sm px-3 cursor-pointer"}>Open
                                    comment section</div>
                            } title={""}>
                                <CommentsComponent comments={post.comments} className={"flex"}></CommentsComponent>
                                <CommentInput className={"block"}></CommentInput>
                            </DialogComponent>
                        </div>
                        <CommentsComponent comments={post.comments} className={"lg:flex hidden"}></CommentsComponent>
                        <CommentInput className={"lg:block hidden"}></CommentInput>
                    </div>
                </div>
            </div>
            <PostsComponent></PostsComponent>
        </div>
    )
}