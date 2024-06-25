"use client"
import {Button, AlertDialog, Flex} from "@radix-ui/themes";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function DeleteIssueButton({issueId}: { issueId: number }) {

    const [error, setError] = useState(false)

    const deleteIssue = async () => {
        try {
            await axios.delete(`/api/issues/` + issueId);
            router.push("/issues");
            router.refresh();
        } catch (error) {
            setError(true)
        }
    }

    const router = useRouter()
    return (
        <>

            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color={"red"}>Delete Issue</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure? The issue cannot be restored after deleting permanently.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button
                                onClick={deleteIssue}
                                variant="solid" color="red"
                            >
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

            <AlertDialog.Root open={error}>
                <AlertDialog.Content maxWidth={"450px"}>
                    <AlertDialog.Title>Error </AlertDialog.Title>
                    <AlertDialog.Description size={"2"}>
                        Unexpected error occurred deleting the issue.
                    </AlertDialog.Description>
                    <Flex justify={"end"}>
                        <Button color={"gray"} variant={"soft"} mt={"2"}
                                onClick={() => setError(false)}
                        >Ok</Button>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}