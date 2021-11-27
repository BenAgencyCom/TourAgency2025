import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export default responsiveFontSizes(
    createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#FDA7DF",
            },
        },
    })
);
