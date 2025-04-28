import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import {cn} from "@/lib/utils";
import {AnimatedGridPattern} from "@/components/magicui/animated-grid-pattern";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AuthApp",
    description: "Auth app for portfolio",
};

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body
            className={"relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background"}
        >
        <AnimatedGridPattern
            maxOpacity={0.1}
            className={cn(
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
            )}
        >
            {children}
        </AnimatedGridPattern>
        </body>
        </html>
    );
}
