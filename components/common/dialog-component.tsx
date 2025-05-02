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
    className?: string,
}

export const DialogComponent = ({triggerButton, title, description, children, className}: Props) => {
    return (
        <Dialog>
            <DialogTrigger className={className}>
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