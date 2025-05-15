import {NextRequest} from "next/server";
import {tokenCheck} from "@/lib/auth";
import {prismaClient} from "@/prisma/prisma-client";

export async function getUserByToken(req: NextRequest) {
    const email = await tokenCheck(req)

    if (!email) {
        return null;
    }

    const user = await prismaClient.user.findUnique({
        where: {email},
    });

    if (!user) {
        return null
    }

    return user
}