"use client"
import Link from "next/link";
import {AiFillBug} from "react-icons/ai";
import {usePathname} from "next/navigation";
import classNames from "classnames";
import {useSession} from "next-auth/react";
import {Avatar, Box, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";

export default function Navbar() {


    return (
        <>
            <nav className={"border-b px-5 mb-5 py-3"}>
                <Container>
                    <Flex justify={"between"}>
                        <Flex align={"center"} gap={"3"}>
                            <Link href={"/"}><AiFillBug/></Link>
                            <NavLinks/>
                        </Flex>
                        <AuthStatus/>
                    </Flex>
                </Container>

            </nav>
        </>
    )
}


const NavLinks = () => {

    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"},

    ]
    const currentPath = usePathname();

    return (
        <>
            <ul className={"flex space-x-6"}>
                {
                    links.map(link =>
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={classNames({
                                    "text-zinc-900": link.href === currentPath,
                                    "text-zinc-500": link.href !== currentPath,
                                    "hover:text-zinc-800 transition-colors": true
                                })}>
                                {link.label}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </>
    )
}


const AuthStatus = () => {
    const {status, data: session} = useSession()

    if (status === "loading") return null;
    if (status === "unauthenticated") {
        return <Link className={"text-zinc-500"} href={`/api/auth/signin`}>Login</Link>
    }

return (
    <>
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar className={"cursor-pointer"} size={"2"} radius={"full"}
                            src={session!.user!.image!} fallback={"?"}/>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size={"2"}>{session!.user!.email!}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link className={"text-zinc-500"} href={`/api/auth/signout`}>Log Out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>

        </Box>
    </>
)
}