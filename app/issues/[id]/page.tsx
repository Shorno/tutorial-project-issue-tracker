import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import ReactMarkDown from "react-markdown"

interface Props {
    params: { id: string }
}


export default async function IssueDetailPage({params}: Props) {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue) {
        notFound()
    }

    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap={"3"} my={"2"}>
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className={"prose mt-5"}>
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card>
        </>
    )
}