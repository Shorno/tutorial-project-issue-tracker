import {Button, Table} from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";

export default async function IssuesPage() {
    const issues = await prisma.issue.findMany();


    return (
        <>
            <div>
                <Button><Link href={"/issues/new"}>New issue</Link></Button>
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
                                                <Table.Cell>{issue.title}
                                                    <div className={"block sm:hidden"}>{issue.status}</div>
                                                </Table.Cell>
                                                <Table.Cell
                                                    className={"hidden sm:table-cell"}>{issue.status}</Table.Cell>
                                                <Table.Cell
                                                    className={"hidden sm:table-cell"}>{issue.createdAt.toString()}</Table.Cell>
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