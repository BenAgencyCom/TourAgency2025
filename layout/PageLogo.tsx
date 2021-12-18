import type { FunctionComponent } from "react";
import Link from "next/link";
import Image from "next/Image";

const PageLogo: FunctionComponent<{}> = () => {
    return (
        <Link href="/">
            <a tabIndex={-1}>
                <Image src="logo.png" width="200" height="30px" alt="logo" unoptimized={true}></Image>
            </a>
        </Link>
    );
};

export default PageLogo;
