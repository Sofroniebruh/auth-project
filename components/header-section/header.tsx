"use client"

import {ImageIcon, MenuIcon, PlusIcon, UserIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {SheetComponent} from "@/components/common";
import {HeaderSearchSmall} from "@/components/header-section/header-search-small";
import {HeaderSearchBig} from "@/components/header-section/header-search-big";

export const HeaderComponent = () => {
    const pathname = usePathname();

    return (
        <header
            className={"flex py-5 px-5 w-full justify-between items-center bg-white/70 backdrop-blur-md fixed top-0"}>
            <SheetComponent triggerElement={<MenuIcon size={25} className={"cursor-pointer"}></MenuIcon>}
                            sheetTitle={"Menu"}
                            side={"left"}>
                <div className={"flex flex-col p-10 gap-5 max-w-[345px] sm:w-full"}>
                    <h1 className={"text-3xl sm:text-5xl font-semibold"}>Cube</h1>
                    <div className={"w-full h-0.5 bg-black"}></div>
                    <ul>
                        <Link href={"/posts"}>
                            <li className={cn("text-lg sm:text-2xl flex gap-2 items-center justify-start cursor-pointer", pathname === "/posts" && "text-blue-600")}>
                                <ImageIcon></ImageIcon> Posts
                            </li>
                        </Link>
                        <Link href={"/profile"}>
                            <li className={cn("text-lg sm:text-2xl flex gap-2 items-center justify-start cursor-pointer", pathname === "/profile" && "text-blue-600")}>
                                <UserIcon></UserIcon> Profile
                            </li>
                        </Link>
                    </ul>
                    <Button size={"lg"}
                            className={"w-full bg-blue-600 mt-10 text-lg sm:text-xl sm:py-6 cursor-pointer text-center"}>Add
                        new
                        Image <PlusIcon/></Button>
                </div>
            </SheetComponent>
            <HeaderSearchBig/>
            <HeaderSearchSmall/>
            <Link href={"/"}>
                <Image src={"/main_logo.png"} width={40} height={40} alt={"main logo"}></Image>
            </Link>
        </header>
    )
}