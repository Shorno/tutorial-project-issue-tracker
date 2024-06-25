import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


export default function LoadingIssueDetailPage() {
    return (
        <>
            <div>
                <Skeleton width={"40rem"}/>
                <Flex gap={"3"} my={"2"}>
                    <Skeleton width={"5rem"}/>
                    <Skeleton width={"8rem"}/>
                </Flex>
                <Card className={"prose mt-5"}>
                    <Skeleton count={3}/>
                </Card>
            </div>
        </>
    )
}