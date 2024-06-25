import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Card, Flex, Heading, Text, Grid, Box, Button} from "@radix-ui/themes";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import ReactMarkDown from "react-markdown"
import {Pencil2Icon} from "@radix-ui/react-icons";
import Link from "next/link";

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
            <Grid gap={"5"} columns={{initial: "1", md: "2"}}>

                <Box>
                    <Heading>{issue.title}</Heading>
                    <Flex gap={"3"} my={"2"}>
                        <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                        <Text>{issue.createdAt.toDateString()}</Text>
                    </Flex>
                    <Card className={"prose mt-5"}>
                        <ReactMarkDown>{issue.description}</ReactMarkDown>
                    </Card>
                </Box>
                <Box>
                    <Button>
                        <Pencil2Icon/>
                        <Link href={`/issues/${issue.id}/edit`}>Edit issue</Link>
                    </Button>
                </Box>
            </Grid>
        </>
    )
}