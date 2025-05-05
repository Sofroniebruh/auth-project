import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import {Toaster} from "@/components/ui/sonner"
import {AuthProvider} from "@/components/providers/providers";

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
        <body className={"h-full"}>
        <AuthProvider>
        {children}
        </AuthProvider>
        </body>
        </html>
    );
}
