import type { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";

const Login: FunctionComponent<{}> = () => {
    const handleClick = () => {
        console.log("signining");
    };
    return (
        <Typography sx={{ color: "text.primary" }} variant="h1" onClick={handleClick}>
            <span>login</span>
        </Typography>
        // /
    );
};

export default Login;
