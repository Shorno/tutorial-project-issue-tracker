import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Grid, Box, Flex} from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/authOptions";

interface Props {
    params: { id: string }
}


export default async function IssueDetailPage({params}: Props) {
    const session = await getServerSession(authOptions)
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
                    {
                        session &&
                        (<Flex direction={"column"} gap={"4"}>
                            <EditIssueButton issueId={issue.id}/>
                            <DeleteIssueButton issueId={issue.id}/>
                        </Flex>)
                    }
                </Box>
            </Grid>
        </>
    )
}