import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from "react";

interface Props {
    triggerButton: React.ReactNode,
    title: string,
    description?: string,
    children: React.ReactNode,
}

export const DialogComponent = ({triggerButton, title, description, children}: Props) => {
    return (
        <Dialog>
            <DialogTrigger
                className={"sm:hidden relative pl-14 pr-7 bg-blue-600 text-center flex cursor-pointer text-base px-4 py-2 rounded-2xl text-white"}>
                {triggerButton}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}