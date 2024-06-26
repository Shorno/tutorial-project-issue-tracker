import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {issueSchema} from "@/app/validationSchemas";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/authOptions";


export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({"message": "Access forbidden"}, {status: 401})
    }

    const body = await request.json()
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 404})

    }


    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json({
        message: "Issue created successfully",
        issue: newIssue

    }, {status: 201})


}