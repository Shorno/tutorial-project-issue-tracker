"use client"
import {Button, AlertDialog, Flex} from "@radix-ui/themes";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function DeleteIssueButton({issueId}: { issueId: number }) {

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
                                onClick={async () => {
                                    await axios.delete(`/api/issues/` + issueId);
                                    router.push("/issues");
                                    router.refresh();
                                }}
                                variant="solid" color="red"
                            >
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}