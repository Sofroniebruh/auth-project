import {AvatarComponent} from "@/components/common/avatar-component";
import {Separator} from "@/components/ui/separator";

export const CommentComponent = () => {
    return (
        <div className={"flex items-center gap-3"}>
            <AvatarComponent email={"qwqw"}
                             profilePicture={"https://github.com/shadcn.png"}></AvatarComponent>
            <div className={"flex flex-col gap-1 max-w-[316px] shrink"}>
                <p className={"text-base font-semibold"}>Username</p>
                <Separator></Separator>
                <p className={"break-words"}>Loremnenjkckjenkcdnjkeecesxsxsxsxwswswsws</p>
            </div>
        </div>
    )
}