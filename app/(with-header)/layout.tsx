import React from "react";
import {HeaderComponent} from "@/components/header";

export default function ChildLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <main className={"relative min-h-screen"}>
            <HeaderComponent></HeaderComponent>
            <div className={"min-h-screen mt-[80px]"}>
                {children}
            </div>
        </main>
    );
}