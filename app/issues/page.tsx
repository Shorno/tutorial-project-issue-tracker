import {Table} from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import IssueAction from "@/app/issues/new/IssueAction";
import delay from "delay";
import Link from "next/link";
import {ClockLoader} from "react-spinners";

export default async function IssuesPage() {
    const issues = await prisma.issue.findMany();
    await delay(1000);


    return (
        <>
            <div>
                <IssueAction/>
                <div className={"mt-5"}>
                    {
                        <Table.Root variant={"surface"}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell
                                        className={"hidden sm:table-cell"}>Status</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell
                                        className={"hidden sm:table-cell"}>Created</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {
                                    issues.map((issue) => {
                                        return (
                                            <Table.Row key={issue.id}>
                                                <Table.Cell className={"bg-red-500"}>
                                                    <Link className={"text-violet-600 hover:underline"}
                                                          href={`/issues/${issue.id}`}>
                                                        {issue.title}
                                                    </Link>
                                                    <div className={"block sm:hidden"}><IssueStatusBadge
                                                        status={issue.status}/></div>
                                                </Table.Cell>
                                                <Table.Cell
                                                    className={"hidden sm:table-cell"}><IssueStatusBadge
                                                    status={issue.status}/></Table.Cell>
                                                <Table.Cell
                                                    className={"hidden sm:table-cell"}>{issue.createdAt.toDateString()}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                            </Table.Body>
                        </Table.Root>
                    }
                </div>
            </div>
        </>
    )
}

export const dynamic = "force-dynamic";