import { alpha } from "@mui/system";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
    interface TypeBackground {
        lightPaper: string;
    }
}

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
                main: "#fc8e77",
                dark: "#b06353",
            },
            secondary: {
                main: "#052946",
                dark: "#375269",
                contrastText: "#fff",
            },
            neutral: {
                main: "#222f3e",
                contrastText: "#fff",
            },
            error: {
                main: "#D62246",
            },
            success: {
                main: "#388E3C",
            },
            warning: {
                main: "#F57C00",
            },
            background: {
                paper: "#fed2c7",
                default: "#fff5f3",
                lightPaper: "#fee8e3",
            },
            text: {
                primary: "#052946",
            },
        },
        components: {
            MuiDivider: {
                styleOverrides: {
                    root: {
                        background: alpha("#052946", 0.08),
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    select: {
                        color: "#fff",
                    },
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        color: "#fff",
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        fontSize: "1rem",
                        letterSpacing: "1px",
                        fontWeight: 300,
                        textTransform: "capitalize",
                        background: "#052946",
                        padding: "5px 10px",
                        cursor: "default",
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    h4: {
                        fontWeight: 700,
                    },
                },
            },
        },
    })
);
