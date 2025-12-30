import { HStack, Link, Text } from "@chakra-ui/react"
import Image from "next/image"
import styles from "@/app/page.module.css";

const Header = () => {
    return (
        <HStack justify={"space-between"} display={"flex"} width={'100%'} mb={'20vh'}>
            <Image
                className={styles.logo}
                src="/logo.jpg"
                alt="IMS logo"
                width={100}
                height={20}
                priority
            />
            {/* <HStack>
                <Link>Dashboard</Link>
                <Link>Profile</Link>
            </HStack> */}
        </HStack>
    )
}

export default Header