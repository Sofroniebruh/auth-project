import {AvatarComponent} from "@/components/common/avatar-component";
import {Separator} from "@/components/ui/separator";
import {Comment} from "@/components/common/comments-component";

interface Props {
    comment: Comment;
}

export const CommentComponent = ({comment}: Props) => {
    return (
        <div className="flex items-start gap-3 w-full">
            <AvatarComponent
                className="w-9 h-9 shrink-0"
                email={comment.commentOwner.username}
                profilePicture={comment.commentOwner.pfpUrl}
            />

            <div className="flex flex-col gap-1 w-full">
                <p className="text-base font-semibold break-words">{comment.commentOwner.username}</p>
                <Separator/>
                <p className="break-words">{comment.commentContent}</p>
            </div>
        </div>
    );
};

