import type { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Login from "@mui/icons-material/Login";

const LoginAndRegister: FunctionComponent<{}> = () => {
    return (
        <Box sx={{ ml: 2 }}>
            <Button variant="contained" sx={{ px: 3, mx: 1 }}>
                <Login sx={{ mr: 1 }}></Login>
                <span>Login</span>
            </Button>
            <Button variant="outlined" sx={{ px: 3, mx: 1 }}>
                Register
            </Button>
        </Box>
    );
};

export default LoginAndRegister;
