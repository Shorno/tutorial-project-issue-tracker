import {NextRequest, NextResponse} from "next/server";
import {z} from "zod"
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
    title: z.string().min(5,"Title is required").max(255),
    description: z.string().min(10, "Description is required")
})


export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 404})


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