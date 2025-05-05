"use client"

import {LogOutIcon, SettingsIcon} from "lucide-react";
import {ChangableAvatarComponent, DialogComponent, HoverCardComponent, SheetComponent} from "@/components/common";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ProfileTabsComponent} from "@/components/general/profile-tabs";
import {API} from "@/lib/api-client/api";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {useUserData} from "@/lib/hooks";
import {Skeleton} from "@/components/ui/skeleton";
import {FormProvider, useForm} from "react-hook-form";
import {usernameSchema, UsernameSchemaType} from "@/components/auth/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import Link from "next/link";

export const ProfileComponent = () => {
    const {email, username, isInfoLoading, setUsername, changedUsername, setChangedUsername} = useUserData()
    const [saveDisabled, setSaveDisabled] = useState(true)

    const router = useRouter();
    const form = useForm<UsernameSchemaType>({
        resolver: zodResolver(usernameSchema),
        defaultValues: {
            username: "",
        }
    })

    const handleUsernameSubmit = async (value: UsernameSchemaType) => {
        if (await API.changeUserInfo.changeUserName(value.username)) {
            setUsername(value.username);
            setChangedUsername(value.username);

            toast.success("Username was updated successfully.");

            return;
        }
        toast.error("Error updating your username.");
    }

    const handleDelete = async () => {
        if (await API.changeUserInfo.deleteUser()) {
            router.push("/")

            return;
        }

        toast.error("Error deleting the user");
    }

    const handleLogout = async () => {
        if (await API.auth.logout()) {
            router.push("/");

            return;
        }

        toast.error("Error while logging out")
    }

    return (
        <div className={"w-full min-h-screen p-5 flex flex-col"}>
            <div className={"flex flex-col items-center justify-center gap-5"}>
                <ChangableAvatarComponent email={email}
                                          className={"sm:w-[110px] sm:h-[110px]"}></ChangableAvatarComponent>
                {isInfoLoading ? (
                    <div className={"flex flex-col items-center justify-center gap-1"}>

                        <Skeleton className={"w-[174px] h-[32px] sm:w-[174px] sm:h-[48px]"}></Skeleton>
                        <Skeleton className={"w-[174px] h-[24px] sm:w-[174px] sm:h-[28px]"}></Skeleton>
                    </div>
                ) : (
                    <div className={"flex flex-col items-center justify-center gap-1"}>
                        <HoverCardComponent trigger={
                            <h1 className={"text-2xl sm:text-5xl"}>{changedUsername}</h1>
                        } content={username}/>
                        <p className={"text-gray-700 text-base sm:text-lg"}>{email}</p>
                    </div>
                )}
                <div className={"flex gap-2.5"}>
                    <div onClick={handleLogout}
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
                                    <ChangableAvatarComponent></ChangableAvatarComponent>
                                </div>
                                <FormProvider {...form}>
                                    <form onSubmit={form.handleSubmit(handleUsernameSubmit)}>
                                        <label className={"text-sm text-gray-500"} htmlFor={"username"}>Your
                                            username</label>
                                        <div>
                                            <div className={"relative"}>
                                                <Input {...form.register("username")}
                                                       onChange={() => setSaveDisabled(false)} className={"mt-1"}
                                                       name={"username"}
                                                       placeholder={username}></Input>
                                            </div>
                                            {form.formState.errors.username && (
                                                <p className={"text-sm text-red-500"}>{form.formState.errors.username.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className={"text-sm text-gray-500"} htmlFor={"email"}>Your
                                                email</label>
                                            <Input className={"mt-1"} name={"email"} value={email} readOnly={true}
                                                   disabled={true}></Input>
                                        </div>
                                        <div className={"mt-10 sm:mt-0 flex gap-2 flex-col sm:flex-row"}>
                                            <Link href={"/request-password-change"}>
                                                <Button type={"button"} variant={"outline"}
                                                        className={"mt-4 w-full text-sm"}>Change
                                                    your
                                                    password</Button>
                                            </Link>
                                            <Button type={"submit"} disabled={saveDisabled} variant={"outline"}
                                                    className={"sm:mt-4 text-sm sm:flex-1"}>Save</Button>
                                        </div>
                                    </form>
                                </FormProvider>
                                <DialogComponent triggerButton={
                                    <div
                                        className={"cursor-pointer mt-10 bg-red-500 text-sm text-white p-2 rounded-md"}>Delete
                                        account</div>
                                } title={"Are you sure?"} description={"This action can not be undone"}>
                                    <div className={"w-full flex items-center justify-center gap-5"}>
                                        <Button onClick={handleDelete} size={"lg"} variant={"destructive"}>Delete My
                                            Account</Button>
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