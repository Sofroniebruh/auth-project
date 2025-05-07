import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui-components/ui/dialog"
import React from "react";

interface Props {
    triggerButton: React.ReactNode,
    title: string,
    description?: string,
    children: React.ReactNode,
    className?: string,
    openState?: boolean,
}

export const DialogComponent = ({triggerButton, title, description, children, className, openState}: Props) => {
    return (
        <Dialog open={openState}>
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