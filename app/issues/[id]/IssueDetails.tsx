import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import ReactMarkDown from "react-markdown";
import {Issue} from "@prisma/client";

export default function IssueDetails({issue}: { issue: Issue }) {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap={"3"} my={"2"}>
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className={"prose mt-5 max-w-full"}>
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card>
        </>
    )
}