import {HeartIcon, ShareIcon} from "lucide-react";

export const PostCardComponent = ({image}: { image: string }) => {
    return (
        <div className={"rounded-lg shadow-sm overflow-hidden relative"}>
            <img className={"w-full h-auto"} src={image} alt={""}></img>
            <div className={"absolute bottom-5 right-5"}>
                <div className={"flex items-center gap-2.5"}>
                    <div className={"rounded-full bg-white p-2 cursor-pointer hover:bg-white/70"}>
                        <ShareIcon size={20}></ShareIcon>
                    </div>
                    <div className={"rounded-full bg-white p-2 cursor-pointer hover:bg-white/70"}>
                        <HeartIcon size={20}></HeartIcon>
                    </div>
                </div>
            </div>
        </div>
    )
}