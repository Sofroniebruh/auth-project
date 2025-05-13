"use client"

import {PostCardOpenedVersion} from "@/components/posts-related/post-card-opened-version";
import {ArrowLeftIcon, EditIcon, HeartIcon, InfoIcon, MessageCircleIcon, ShareIcon, TrashIcon} from "lucide-react";
import {Button} from "@/components/ui-components/ui/button";
import {Separator} from "@/components/ui/separator";
import {AvatarComponent, CommentInput, CommentsComponent, DialogComponent, PopoverComponent} from "@/components/common";
import {PostsComponent} from "@/components/posts-related/posts-component";
import {PostWithRelations} from "@/lib/helpers/helper-types-or-interfaces";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";
import {API} from "@/lib/api-client/api";
import {useIsAuthenticated} from "@/lib/hooks";
import {toast} from "sonner";

interface Props {
    post: PostWithRelations;
    isOwner: boolean;
    likesAmount: number;
    setLikesAmount: (likesAmount: string) => void;
}

export const PostComponent = ({post, isOwner, likesAmount, setLikesAmount}: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    const {isLoggedIn} = useIsAuthenticated()


    useEffect(() => {
        window.scroll(0, 0)
    }, [pathname])

    const handleLike = async (id: number) => {
        if (!isLoggedIn) {
            toast("Log In to like")
            return;
        }

        const res = await API.posts.likePost(id)

        if (res === 200) {
            setLikesAmount((Number(likesAmount) - 1).toString())
        } else if (res === 201) {
            setLikesAmount((Number(likesAmount) + 1).toString())
        } else {
            toast("Failed to like post")
        }
    }

    return (
        <div className={"flex flex-col"}>
            <div className="px-5 sm:px-[80px] pt-10 pb-4 sm:py-10">
                <div className="flex flex-col sm:flex-row justify-center gap-8">
                    <div
                        className="w-full sm:min-w-[240px] sm:max-w-[300px] md:max-w-[370px] xl:max-w-[430px] flex items-center justify-center relative gap-8">
                        <div onClick={router.back}
                             className={"hidden md:block rounded-full p-2.5 cursor-pointer bg-blue-600 text-white hover:bg-blue-500"}>
                            <ArrowLeftIcon/></div>
                        <PostCardOpenedVersion
                            image={post.postImageUrl}/>
                    </div>
                    <div className="flex flex-col w-full lg md:w-[400px] md:mt-0 gap-4 min-h-0 justify-between">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <div className={"flex items-center gap-3"}>
                                    <Link href={"#"}>

                                        <AvatarComponent className={"w-9 h-9"} email={post.createdBy.email}
                                                         profilePicture={post.createdBy.pfpUrl}/>
                                    </Link>
                                    <h1 className="font-semibold text-lg">{post.createdBy.username}</h1>
                                </div>
                                <PopoverComponent className={"mr-5 z-30"} trigger={
                                    <InfoIcon className={"cursor-pointer text-gray-500"}></InfoIcon>
                                } content={
                                    <div className={""}>
                                        <h1 className={"text-xl font-semibold mb-3"}>Post details</h1>
                                        <Separator></Separator>
                                        <div className={"mt-3 flex flex-col gap-1 break-words"}>
                                            <div>
                                                <h1 className={"text-md font-semibold"}>Name</h1>
                                                <p>{post.postName}</p>
                                            </div>
                                            <div>
                                                <h1 className={"text-md font-semibold"}>Description</h1>
                                                {post.description!.length == 0 ?
                                                    (<p className={"text-gray-400"}>Author did not provide a
                                                        description</p>) :
                                                    (
                                                        <p>{post.description}</p>
                                                    )}
                                            </div>
                                            <div>
                                                <h1 className={"text-md font-semibold"}>Created at</h1>
                                                <p>
                                                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric"
                                                    })}
                                                </p>
                                            </div>
                                            <div>

                                                {/*// TODO: change to dynamic data*/}

                                                <h1 className={"text-md font-semibold"}>Tags</h1>
                                                <div className={"break-words w-full flex gap-x-2 flex-wrap"}>
                                                    <p>#Frieren</p>
                                                    <p>#Anime</p>
                                                    <p>#Bladerunner</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }></PopoverComponent>
                            </div>
                            <div className="flex items-center justify-between">
                                {
                                    isOwner ? (
                                        <div className={"flex gap-2"}>
                                            <Button variant={"destructive"}>Delete Post <TrashIcon></TrashIcon></Button>
                                            <Button
                                                className={"bg-blue-600 hover:bg-blue-500"}>Edit <EditIcon></EditIcon></Button>
                                        </div>
                                    ) : (
                                        <div className={"flex items-center gap-3"}>
                                            <div className={"w-[65px] flex items-center justify-center"}>
                                                <p className="font-semibold">{likesAmount}</p>
                                            </div>
                                            <Button onClick={() => handleLike(post.id)}
                                                    variant="outline">Like <HeartIcon/></Button>
                                            <div className="flex items-center gap-3">
                                                <Button variant="outline">Save <ShareIcon/></Button>
                                            </div>
                                        </div>
                                    )
                                }
                                <DialogComponent className={"flex flex-col justify-center items-center"} triggerButton={
                                    <div
                                        className={"sm:hidden rounded-full p-2.5 cursor-pointer bg-blue-600 text-white hover:bg-blue-500"}>
                                        <MessageCircleIcon className={"w-5 h-5"}></MessageCircleIcon>
                                    </div>
                                } title={""}>
                                    <CommentsComponent isOwner={isOwner} comments={post.comments}
                                                       className={"flex w-full"}></CommentsComponent>
                                    <CommentInput className={"block"}></CommentInput>
                                </DialogComponent>
                            </div>
                            <Separator/>
                        </div>

                        <div className={"hidden sm:flex lg:hidden w-full h-full items-center justify-center"}>
                            <DialogComponent className={"flex flex-col justify-center items-center"} triggerButton={
                                <div
                                    className={"bg-blue-600 hover:bg-blue-500 text-white rounded-md p-2 text-sm px-3 cursor-pointer"}>Open
                                    comment section</div>
                            } title={""}>
                                <CommentsComponent isOwner={isOwner} comments={post.comments}
                                                   className={"flex w-full"}></CommentsComponent>
                                <CommentInput className={"block"}></CommentInput>
                            </DialogComponent>
                        </div>
                        <CommentsComponent isOwner={isOwner} comments={post.comments}
                                           className={"lg:flex hidden"}></CommentsComponent>
                        <CommentInput className={"lg:block hidden"}></CommentInput>
                    </div>
                </div>
            </div>
            <PostsComponent></PostsComponent>
        </div>
    )
}