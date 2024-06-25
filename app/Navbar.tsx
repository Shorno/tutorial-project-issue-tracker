"use client"
import Link from "next/link";
import {AiFillBug} from "react-icons/ai";
import {usePathname} from "next/navigation";
import classNames from "classnames";
import {useSession} from "next-auth/react";
import {Box, Container, Flex} from "@radix-ui/themes";

export default function Navbar() {

    const currentPath = usePathname();

    const {status, data: session} = useSession()

    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"},

    ]

    return (
        <>
            <nav className={"border-b px-5 mb-5 py-3"}>
                <Container>
                    <Flex justify={"between"}>
                        <Flex align={"center"} gap={"3"}>
                            <Link href={"/"}><AiFillBug/></Link>
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
                        </Flex>
                        <Box>
                            {status === "authenticated" && <Link href={`/api/auth/signout`}>Log Out</Link>}
                            {status === "unauthenticated" && <Link href={`/api/auth/login`}>Login</Link>}
                        </Box>
                    </Flex>
                </Container>

            </nav>
        </>
    )
}