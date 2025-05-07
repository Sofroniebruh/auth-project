import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui-components/ui/sheet"
import React from "react";

interface Props {
    triggerElement: React.ReactNode,
    children: React.ReactNode,
    side?: "right" | "top" | "bottom" | "left",
    className?: string,
    sheetTitle: string | React.ReactNode,
    sheetDescription?: string,
}

export const SheetComponent = (
    {
        triggerElement,
        children,
        side = "right",
        className,
        sheetTitle,
        sheetDescription
    }: Props) => {
    return (
        <Sheet>
            <SheetTrigger className={className}>
                {triggerElement}
            </SheetTrigger>
            <SheetContent side={side}>
                <SheetHeader>
                    <SheetTitle>
                        {sheetTitle}
                    </SheetTitle>
                    {sheetDescription && (
                        <SheetDescription>
                            {sheetDescription}
                        </SheetDescription>
                    )}
                </SheetHeader>
                {children}
            </SheetContent>
        </Sheet>
    )
}