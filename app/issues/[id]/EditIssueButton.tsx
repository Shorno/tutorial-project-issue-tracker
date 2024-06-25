import {Pencil2Icon} from "@radix-ui/react-icons";
import Link from "next/link";
import {Button} from "@radix-ui/themes";

export default function EditIssueButton({issueId}: { issueId: number }) {
    return (
        <>
            <Button>
                <Pencil2Icon/>
                <Link href={`/issues/${issueId}/edit`}>Edit issue</Link>
            </Button>
        </>
    )
}