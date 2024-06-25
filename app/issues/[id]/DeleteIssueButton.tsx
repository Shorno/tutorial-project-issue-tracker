import {Button, AlertDialog, Flex} from "@radix-ui/themes";

export default function DeleteIssueButton({issueId}: { issueId: number }) {
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
                            <Button variant="solid" color="red">
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}