import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        neutral: Palette["primary"];
    }
    interface PaletteOptions {
        neutral: PaletteOptions["primary"];
    }
}
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}
declare module "@mui/material/FormHelperText" {
    namespace FormHelperTextProps {
        export interface DatasetAttr {
            "data-cy": string;
        }
    }
}

export default responsiveFontSizes(
    createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#FDA7DF",
            },
            neutral: {
                main: "#222f3e",
                contrastText: "#fff",
            },
        },
    })
);
