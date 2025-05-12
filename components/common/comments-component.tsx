import {CommentComponent} from "@/components/common/comment-component";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {cn} from "@/lib/utils";

interface Props {
    className?: string;
}

export const CommentsComponent = ({className}: Props) => {
    return (
        <div className={cn("flex-col gap-4", className)}>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            <div className={"flex h-[400px] w-full"}>
                <div
                    className="overflow-y-auto h-full flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
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
        </div>
    )
}