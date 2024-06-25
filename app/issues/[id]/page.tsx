import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Grid, Box} from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";

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
                    <IssueDetails issue={issue}/>
                </Box>
                <Box>
                    <EditIssueButton issueId={issue.id}/>
                </Box>
            </Grid>
        </>
    )
}