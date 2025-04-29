import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LogInIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {CommonCard} from "@/components/common-card";

export const SignInComponent = () => {
    return (
        <CommonCard className={"gap-10"} isForAuth={true}>
            <div className={"flex flex-col gap-3 w-full"}>
                <Input placeholder={"Enter your email"}></Input>
                <Button className={"cursor-pointer shadow-sm text-base"}>Sign
                    In <LogInIcon></LogInIcon></Button>
            </div>
            <div className={"flex w-full items-center justify-center gap-2"}>
                <div className={"h-0.5 w-full bg-gray-200"}></div>
                <p className={"text-base text-gray-500"}>OR</p>
                <span className={"h-0.5 w-full bg-gray-200"}></span>
            </div>
            <div className={"flex flex-col gap-3 w-full"}>
                <Button className={"shadow-sm cursor-pointer w-full text-base"}
                        variant={"outline"}>Sign In with <Image
                    src={"/google-icon.png"}
                    alt={"google icon"} width={20} height={20}></Image></Button>
                <p className={"text-sm text-gray-400"}>Don't have an account? <Link className={"text-blue-600"}
                                                                                    href={"/sign-up"}>Sign Up
                    here</Link></p>
            </div>
        </CommonCard>
    )
}