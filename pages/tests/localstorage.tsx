// Tools
import useLocalStorage from "@/hooks/useLocalStorage";
import dynamic from "next/dynamic";
// Type
import type { FunctionComponent, ChangeEvent } from "react";
// Material UI Components
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// Other components
import Head from "next/head";

const LocalStorage: FunctionComponent = () => {
    const [value, setValue] = useLocalStorage("message", "jebac gorzen");

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    const reload = () => location.reload();

    return (
        <>
            <Head>
                <title>Tests- local storage</title>
            </Head>
            <Container sx={{ mt: "150px", py: 2, color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h2">Tests</Typography>
                    <TextField
                        sx={{ mx: 2, width: "350px" }} //
                        label="Save this message in local storage"
                        value={value}
                        onChange={onChange}
                    ></TextField>
                    <Button variant="contained" onClick={reload}>
                        Reload
                    </Button>
                </Box>

                <Divider sx={{ my: 2 }}></Divider>

                <Typography variant="h1">{value}</Typography>
            </Container>
        </>
    );
};

export default dynamic(() => Promise.resolve(LocalStorage), { ssr: false });
