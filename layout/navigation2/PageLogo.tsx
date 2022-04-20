import type { FunctionComponent } from "react";
import Link from "next/link";
import Image from "next/Image";
import Box from "@mui/material/Box";

const PageLogo: FunctionComponent<{}> = () => {
    return (
        <Box sx={{ position: "relative", zIndex: 1 }}>
            <Link href="/">
                <a tabIndex={-1}>
                    <Image src="/logo.png" width="200" height="30px" alt="logo" unoptimized={true}></Image>
                </a>
            </Link>
        </Box>
    );
};

export default PageLogo;
