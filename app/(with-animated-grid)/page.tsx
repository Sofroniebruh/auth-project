import {Button} from "@/components/ui/button";
import {LogInIcon} from "lucide-react";
import {CommonCard} from "@/components/common-card";
import Link from "next/link";
import React from "react";

export default function Home() {
    return (
        <CommonCard>
            <h1 className={"text-3xl sm:text-4xl font-semibold"}>Welcome to <span
                className={"text-blue-600"}>Cube</span></h1>
            <div className={"z-50 flex flex-col items-center justify-center gap-5 w-full"}>
                <Link href="/sign-in" className={"w-full flex items-center justify-center"}>
                    <Button
                        className={"w-2/3 shadow-sm bg-linear-to-r/decreasing from-gray-50 to-white text-black border text-base sm:text-lg py-5 cursor-pointer rounded-lg"}>Sign
                        in <LogInIcon></LogInIcon></Button>
                </Link>
                <Link href="/posts" className={"w-full flex items-center justify-center"}>
                    <Button
                        className={"w-2/3 shadow-sm bg-linear-to-r/decreasing from-blue-50 to-white text-black border text-base sm:text-lg py-5 cursor-pointer rounded-lg"}>Browse...</Button>
                </Link>
            </div>
        </CommonCard>
    );
}
