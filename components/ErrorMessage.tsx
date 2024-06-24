import {PropsWithChildren} from "react";
import {Text} from "@radix-ui/themes";

export default function ErrorMessage({children}: PropsWithChildren) {
    if (!children) return null;

    return (
        <Text as={"p"} color={"red"}>
            {children}
        </Text>
    )
}