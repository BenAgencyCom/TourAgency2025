// Types
import type { NextPage } from "next";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other components
import Head from "next/head";
// Styled components
import ContentContainter from "@/components/_utils/styled/ContentContainter";

const AccountPolitics: NextPage = () => {
    return (
        <>
            <Head>
                <title>MES | Terms of services</title>
            </Head>
            <ContentContainter
                header={{
                    main: "Terms of services",
                    background: "rules",
                }}
            >
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla omnis quae voluptates quis. Pariatur eius quia ipsa magnam, tempora ut eos temporibus, alias possimus quod maiores
                    dolorem, voluptatum non aliquam! Sapiente necessitatibus doloribus eos illo dolorem, excepturi velit, perferendis repudiandae, natus voluptates unde fuga aliquam! Ab provident nam
                    debitis, cum quaerat veritatis, enim possimus quasi expedita asperiores aspernatur aliquid quae! Temporibus, omnis eum, aliquam ex odit magni veritatis laudantium corrupti tempore
                    velit consequuntur quod in beatae sequi sapiente repellat dolor nam provident. Ipsa, repudiandae facilis quasi ipsum eaque iste consequuntur!
                </Typography>
            </ContentContainter>
        </>
    );
};
export default AccountPolitics;
