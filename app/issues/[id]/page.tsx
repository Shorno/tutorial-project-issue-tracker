import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Grid, Box, Flex} from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";

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
            <Grid gap={"5"} columns={{initial: "1", sm: "5"}}>
                <Box className={"md:col-span-4"}>
                    <IssueDetails issue={issue}/>
                </Box>
                <Box>
                    <Flex direction={"column"} gap={"4"}>
                        <EditIssueButton issueId={issue.id}/>
                        <DeleteIssueButton issueId={issue.id}/>
                    </Flex>
                </Box>
            </Grid>
        </>
    )
}