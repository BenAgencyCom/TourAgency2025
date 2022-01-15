// Types
import type { FunctionComponent } from "react";
// Other components
import Link from "next/link";
// Material UI Components
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const Redirects: FunctionComponent = () => {
    return (
        <>
            <Divider sx={{ my: 1, width: "100%" }}></Divider>
            <CardActions
                sx={{
                    justifyContent: "center", //
                    mb: 1,
                    ["@media (max-width:470px)"]: {
                        flexDirection: "column",
                    },
                }}
            >
                <Button>
                    <Link href="/register">
                        <a>Don&apos;t have an account? Create one</a>
                    </Link>
                </Button>
                <Button>
                    <Link href="/">
                        <a>Main page</a>
                    </Link>
                </Button>
            </CardActions>
        </>
    );
};

export default Redirects;
