import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/prisma/prisma-client";
import {tokenCheck} from "@/lib/auth";
import {updateProfileUsernameOrProfilePictureSchemaForAPI} from "@/components/auth/schema";

export async function GET(req: NextRequest) {
    const email = await tokenCheck(req)

    if (!email) {
        return NextResponse.json({message: "Not authenticated"}, {status: 401})
    }

    const user = await prismaClient.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return NextResponse.json({message: "No user was found"}, {status: 404})
    }

    return NextResponse.json({user: user}, {status: 200})
}

export async function DELETE(req: NextRequest) {
    const email = await tokenCheck(req)

    if (!email) {
        return NextResponse.json({message: "Not authenticated"}, {status: 401})
    }

    const user = await prismaClient.user.delete({
        where: {
            email
        }
    })

    if (!user) {
        return NextResponse.json({message: "No user was found"}, {status: 404})
    }

    const res = NextResponse.json({message: "User was deleted successfully"}, {status: 200});

    res.cookies.set("jwt", "", {
        httpOnly: true,
        path: "/",
        expires: new Date(0),
    });

    return res;
}

export async function PUT(req: NextRequest) {
    const email = await tokenCheck(req)
    const body = await req.json()

    if (!email) {
        return NextResponse.json({message: "Not authenticated"}, {status: 401})
    }

    const user = await prismaClient.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return NextResponse.json({message: "No user was found"}, {status: 404})
    }

    const data = updateProfileUsernameOrProfilePictureSchemaForAPI.parse(body)

    await prismaClient.user.update({
        where: {
            email
        },
        data,
    })

    return NextResponse.json({message: "User was updated successfully"}, {status: 200})
}