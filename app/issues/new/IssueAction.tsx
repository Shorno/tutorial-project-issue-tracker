import {Button} from "@radix-ui/themes";
import Link from "next/link";

export default function IssueAction() {
    return (
        <>
            <Button><Link href={"/issues/new"}>New issue</Link></Button>

        </>
    )
}