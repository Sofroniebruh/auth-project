import React from "react";

export default function ChildLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <>
            <div>You can see me!</div>
            {children}
        </>
    );
}