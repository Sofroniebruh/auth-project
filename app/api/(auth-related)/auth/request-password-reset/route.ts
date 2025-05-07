import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/prisma/prisma-client";
import {generateResetJWT} from "@/lib/auth/jwt-actions";

export async function POST(req: NextRequest) {
    const email = (await req.json()) as { email: string };

    const isValidEmail = await prismaClient.user.findUnique({
        where: email,
    })

    if (!isValidEmail) {
        return NextResponse.json({message: "Invalid email"}, {status: 500})
    }

    const token = generateResetJWT({email});
    const resetLink = `${process.env.NEXT_PUBLIC_ROUTE}/forgot-password?token=${token}`;

    console.log(resetLink);
    //TODO: ADD SENDING EMAILS WITH TWILLO

    return NextResponse.json({message: "Successfully sent"}, {status: 200})
}