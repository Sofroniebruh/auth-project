import {AvatarComponent} from "@/components/common/avatar-component";
import {Separator} from "@/components/ui/separator";

export const CommentComponent = () => {
    return (
        <div className="flex items-start gap-3 w-full">
            <AvatarComponent
                className="w-9 h-9 shrink-0"
                email="qwqw"
                profilePicture="https://github.com/shadcn.png"
            />

            <div className="flex flex-col gap-1 w-full">
                <p className="text-base font-semibold break-words">Username</p>
                <Separator/>
                <p className="break-words">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec
                    elementum urna, nec vestibulum lorem.
                </p>
            </div>
        </div>
    );
};

