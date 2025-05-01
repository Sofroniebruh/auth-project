"use client"

import {Button} from "@/components/ui/button";
import {LogInIcon, UserIcon} from "lucide-react";
import Link from "next/link";
import React from "react";
import {CommonCard} from "@/components/common";
import {useIsAuthenticated} from "@/lib/hooks";

export default function Home() {
    const {isLoggedIn, loading} = useIsAuthenticated()
    console.log(loading)

    return (
        <CommonCard>
            <h1 className={"text-3xl sm:text-4xl font-semibold"}>Welcome to <span
                className={"text-blue-600"}>Cube</span></h1>
            <div className={"z-50 flex flex-col items-center justify-center gap-5 w-full"}>
                {isLoggedIn ? (
                    <Link href="/profile" className={"w-full flex items-center justify-center"}>
                        <Button loading={loading}
                                className={"w-2/3 shadow-sm bg-linear-to-r/decreasing from-gray-50 to-white text-black border text-base sm:text-lg py-5 cursor-pointer rounded-lg"}>
                            Profile <UserIcon></UserIcon>
                        </Button>
                    </Link>
                ) : (
                    <Link href="/sign-in" className={"w-full flex items-center justify-center"}>
                        <Button loading={loading}
                                className={"w-2/3 shadow-sm bg-linear-to-r/decreasing from-gray-50 to-white text-black border text-base sm:text-lg py-5 cursor-pointer rounded-lg"}>Sign
                            in <LogInIcon></LogInIcon></Button>
                    </Link>
                )}
                <Link href="/posts" className={"w-full flex items-center justify-center"}>
                    <Button
                        className={"w-2/3 shadow-sm bg-linear-to-r/decreasing from-blue-50 to-white text-black border text-base sm:text-lg py-5 cursor-pointer rounded-lg"}>Browse...</Button>
                </Link>
            </div>
        </CommonCard>
    );
}
