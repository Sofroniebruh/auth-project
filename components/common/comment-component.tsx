import {AvatarComponent} from "@/components/common/avatar-component";
import {Comment} from "@/components/common/comments-component";
import {HeartIcon} from "lucide-react";
import {formatDistanceToNow} from "date-fns";

interface Props {
    comment: Comment;
    isOwner: boolean;
}

export const CommentComponent = ({comment, isOwner}: Props) => {
    return (
        <div className="flex items-start gap-3 w-full">
            <AvatarComponent
                className="w-9 h-9 shrink-0"
                email={comment.commentOwner.username}
                profilePicture={comment.commentOwner.pfpUrl}
            />

            <div className="flex flex-col gap-1 w-full">
                <div className={"flex gap-3"}>
                    <p className="text-base font-semibold break-words">{comment.commentOwner.username}</p>
                    {isOwner && (
                        <div className={"bg-gray-200 rounded-sm px-1 flex items-center"}><p className={"text-sm text-center"}>Creator</p></div>
                    )}
                </div>
                <p className="break-words">{comment.commentContent}</p>
                <div className={"flex gap-5 items-center"}>
                    <p className={"text-sm text-gray-400"}>{formatDistanceToNow(new Date(comment.createdAt), {addSuffix: true})}</p>
                    <HeartIcon className={"w-4 h-4 cursor-pointer hover:text-red-600"}></HeartIcon>
                </div>
            </div>
        </div>
    );
};

