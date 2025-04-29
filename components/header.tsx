"use client"

import {SheetComponent} from "@/components/sheet-component";
import {BellIcon, ImageIcon, MenuIcon, PlusIcon, SearchIcon, UserIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {DialogComponent} from "@/components/dialog-component";

export const HeaderComponent = () => {
    const pathname = usePathname();
    const notifications = 100

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
                        <Link href={"/notifications"}>
                            <li className={cn("text-lg sm:text-2xl flex gap-2 items-center justify-start cursor-pointer", pathname === "/notifications" && "text-blue-600")}>
                                <BellIcon></BellIcon> Notifications <div
                                className={cn("rounded-full bg-blue-600 text-white text-sm", notifications < 10 ? "px-[12px] py-[7px]" : notifications <= 99 && notifications >= 10 ? "px-[6px] py-[4px]" : notifications > 99 ? "px-[4px] py-[6px]" : "")}>99+</div>
                            </li>
                        </Link>
                    </ul>
                    <Button size={"lg"}
                            className={"w-full bg-blue-600 mt-10 text-lg sm:text-xl sm:py-6 cursor-pointer text-center"}>Add
                        new
                        Image <PlusIcon/></Button>
                </div>
            </SheetComponent>
            <div className={"relative hidden sm:block sm:w-2/3"}>
                <Input className={"w-full pl-[34px]"} placeholder={"Search..."}></Input>
                <SearchIcon className={"text-blue-600 absolute top-[7px] left-[7px] opacity-50"}></SearchIcon>
            </div>
            <DialogComponent
                triggerButton={<><SearchIcon className={"absolute top-2 left-2"}></SearchIcon> Search...</>}
                title={"Search"}>
                <div className={"flex flex-col gap-5"}>
                    <div className={"relative w-full flex gap-2"}>
                        <Input className={"w-full pl-[34px]"} placeholder={"Search..."}></Input>
                        <SearchIcon className={"text-blue-600 absolute top-[7px] left-[7px] opacity-50"}></SearchIcon>
                        <Button className={"bg-blue-600 cursor-pointer"}>Go</Button>
                    </div>
                    <div>
                        <h1 className={"text-2xl text-blue-600"}>Categories you may like:</h1>
                        <ul className={"text-xl mt-2.5"}>
                            <li>#Nature</li>
                            <li>#Anime</li>
                            <li>#Cars</li>
                        </ul>
                    </div>
                </div>
            </DialogComponent>
            <Link href={"/"}>
                <Image src={"/main_logo.png"} width={40} height={40} alt={"main logo"}></Image>
            </Link>
        </header>
    )
}