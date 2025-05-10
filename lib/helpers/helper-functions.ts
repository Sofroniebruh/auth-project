import {NextRequest} from "next/server";
import {tokenCheck} from "@/lib/auth";
import {prismaClient} from "@/prisma/prisma-client";

export async function getUserByToken(req: NextRequest) {
    const email = await tokenCheck(req)

    if (!email) {
        throw new Error("No email from token");
    }

    const user = await prismaClient.user.findUnique({
        where: {email},
    });

    if (!user) {
        throw new Error("No user found for this email");
    }

    return user
}