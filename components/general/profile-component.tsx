"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {LogOutIcon, SettingsIcon} from "lucide-react";
import {DialogComponent, SheetComponent} from "@/components/common";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {ProfileTabsComponent} from "@/components/general/profile-tabs";

export const ProfileComponent = () => {
    const [usernameValue, setUsernameValue] = useState("Username");
    const handleChange = (value: string) => {
        setUsernameValue(value);
    }

    return (
        <div className={"w-full min-h-screen p-5 flex flex-col"}>
            <div className={"flex flex-col items-center justify-center gap-5"}>
                <Avatar className={"w-[70px] h-[70px] sm:w-[110px] sm:h-[110px] bg-gray-400"}>
                    <AvatarImage src="#"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className={"flex flex-col items-center justify-center gap-1"}>
                    <h1 className={"text-2xl sm:text-5xl"}>Your username</h1>
                    <p className={"text-gray-700 text-base sm:text-lg"}>Your email</p>
                </div>
                <div className={"flex gap-2.5"}>
                    <div
                        className={"bg-blue-600 text-white cursor-pointer rounded-md border shadow-sm flex p-2 gap-2 px-4"}>
                        Log Out <LogOutIcon></LogOutIcon>
                    </div>
                    <SheetComponent triggerElement={
                        <div className={"rounded-md border shadow-sm cursor-pointer flex p-2 gap-2 px-4"}>
                            Settings <SettingsIcon></SettingsIcon>
                        </div>
                    } sheetTitle={"Settings"}>
                        <div className={"w-full flex items-center justify-center"}>
                            <div className={"flex-col flex gap-2 w-3/4"}>
                                <div className={"w-full flex items-center justify-center mb-4"}>
                                    <Avatar className={"w-[70px] h-[70px] bg-gray-400"}>
                                        <AvatarImage src="#"/>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <label className={"text-sm text-gray-500"} htmlFor={"username"}>Your
                                        username</label>
                                    <Input className={"mt-1"} name={"username"}
                                           onChange={(e) => handleChange(e.target.value)}
                                           value={usernameValue}></Input>
                                </div>
                                <div>
                                    <label className={"text-sm text-gray-500"} htmlFor={"email"}>Your email</label>
                                    <Input className={"mt-1"} name={"email"} value={"Your email"} readOnly={true}
                                           disabled={true}></Input>
                                </div>
                                <Button variant={"outline"} className={"mt-4 text-sm"}>Change your
                                    password</Button>
                                <DialogComponent triggerButton={
                                    <div
                                        className={"cursor-pointer bg-red-500 text-sm text-white p-2 rounded-md"}>Delete
                                        account</div>
                                } title={"Are you sure?"} description={"This action can not be undone"}>
                                    <div className={"w-full flex items-center justify-center gap-5"}>
                                        <Button size={"lg"} variant={"destructive"}>Delete My Account</Button>
                                        <Button size={"lg"} variant={"outline"}>Cancel</Button>
                                    </div>
                                </DialogComponent>
                            </div>
                        </div>
                    </SheetComponent>
                </div>
            </div>
            <div className={"w-full mt-10"}>
                <ProfileTabsComponent></ProfileTabsComponent>
            </div>
        </div>
    )
}