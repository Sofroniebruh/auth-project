"use client"

import {PostCardComponent} from "@/components/posts-related/post-card-component";
import {Input} from "@/components/ui-components/ui/input";
import {PostCardOpenedVersion} from "@/components/posts-related/post-card-opened-version";
import {HeartIcon} from "lucide-react";
import {Button} from "@/components/ui-components/ui/button";
import {Separator} from "@/components/ui/separator";
import {AvatarComponent, CommentComponent} from "@/components/common";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

interface Props {
    id: string;
}

export const PostComponent = ({id}: Props) => {
    console.log(id)

    return (
        <div className={"flex flex-col"}>
            <div className="px-5 sm:px-[80px] py-10">
                <div className="flex flex-col sm:flex-row justify-center gap-8">
                    <div className="w-full sm:min-w-[240px] sm:max-w-[300px] md:max-w-[370px] xl:max-w-[400px]">
                        <PostCardOpenedVersion
                            image="https://i.pinimg.com/736x/b1/aa/7f/b1aa7f695c69b85e8e45a79b14f5bdd8.jpg"/>
                    </div>
                    <div className="flex flex-col w-full md:w-[400px] md:mt-0 gap-4 min-h-0">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <AvatarComponent className={"w-9 h-9"} email="qwqwqw" profilePicture="https://github.com/shadcn.png"/>
                                <h1 className="font-semibold text-lg">User 123</h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="font-semibold">123</p>
                                <Button variant="outline">Like <HeartIcon/></Button>
                            </div>
                            <Separator/>
                        </div>

                        <div className={"flex md:hidden w-full h-full items-center justify-center"}>
                            <Button className={"bg-blue-600"}>Open comment section</Button>
                        </div>

                        <div className={"hidden md:flex flex-col gap-4"}>
                            <h2 className="text-xl font-semibold mb-4">Comments</h2>

                            <div className={"flex h-[400px] w-full"}>
                                <div
                                    className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                    <CommentComponent/>
                                    <CommentComponent/>
                                    <CommentComponent/>
                                    <CommentComponent/>
                                    <CommentComponent/>
                                    <CommentComponent/>
                                    <CommentComponent/>
                                    <Pagination className={"mt-8"}>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious href="#"/>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#">1</PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationEllipsis/>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationNext href="#"/>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>

                                </div>
                            </div>
                            <Input className="mt-4 px-3 py-5 min-w-[300px]" placeholder="Add your comment..."/>
                        </div>
                    </div>
                </div>
            </div>
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
        </div>
    )
}