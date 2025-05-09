import {NextRequest} from "next/server";
import {tokenCheck} from "@/lib/auth";
import {prismaClient} from "@/prisma/prisma-client";

export async function getUserByToken(req: NextRequest) {
    const email = await tokenCheck(req)

    if (!email) {
        throw Error
    }

    const user = await prismaClient.user.findUnique({
        where: {email},
    })

    if (!user) {
        throw Error
    }

    return user
}