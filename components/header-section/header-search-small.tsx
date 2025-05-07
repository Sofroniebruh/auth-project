import {SearchIcon} from "lucide-react";
import {Input} from "@/components/ui-components/ui/input";
import {Button} from "@/components/ui-components/ui/button";
import {DialogComponent} from "@/components/common";
import {CategoriesSection, Category} from "@/components/header-section/categories-section";

export const HeaderSearchSmall = () => {
    const items: Category[] = [
        {
            name: "#Anime"
        },
        {
            name: "#Cars"
        },
        {
            name: "#Movies"
        },
    ]

    return (
        <DialogComponent
            triggerButton={
                <div
                    className={"sm:hidden relative pl-14 pr-7 bg-blue-600 text-center flex cursor-pointer text-base px-4 py-2 rounded-2xl text-white"}>
                    <SearchIcon className={"absolute top-2 left-2 "}></SearchIcon> Search...
                </div>}
            title={"Search"}>
            <div className={"flex flex-col gap-5"}>
                <div className={"relative w-full flex gap-2"}>
                    <Input className={"w-full pl-[34px]"} placeholder={"Search..."}></Input>
                    <SearchIcon className={"text-blue-600 absolute top-[7px] left-[7px] opacity-50"}></SearchIcon>
                    <Button className={"bg-blue-600"}>Go</Button>
                </div>
                <CategoriesSection items={items}/>
            </div>
        </DialogComponent>
    )
}