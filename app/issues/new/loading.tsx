import {Box} from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


export default function LoadingNewIssuePage() {
    return (
        <>
            <Box className={"max-w-xl"}>
                <Skeleton height={"2rem"} className={"mb-2"}/>
                <Skeleton height={"20rem"}/>

            </Box>
        </>
    )
}