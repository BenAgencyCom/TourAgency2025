import { alpha } from "@mui/system";
import { createTheme } from "@mui/material/styles";

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

export default createTheme({
    palette: {
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
    typography: {
        // Used for instance in `InputWithIcon` and `SelectWithIcon` components
        subtitle2: {
            fontSize: "1rem",
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
                h5: {
                    fontWeight: 700,
                    letterSpacing: "-1px",
                    fontSize: "1.8rem",
                },
                h4: {
                    fontWeight: 700,
                    letterSpacing: "-1px",
                    fontSize: "2rem",
                },
                h3: {
                    fontWeight: 900,
                    letterSpacing: "-1px",
                    margin: "5px 0 10px 0",
                    fontSize: "2.2rem",
                    lineHeight: "36px",
                    ["@media (max-width:1600px)"]: {
                        lineHeight: "34px",
                        fontSize: "2rem",
                    },
                    ["@media (max-width:1200px)"]: {
                        lineHeight: "32px",
                        fontSize: "1.8rem",
                    },

                    ["@media (max-width:900px)"]: {
                        fontSize: "2.5rem ",
                        lineHeight: "40px",
                    },
                    ["@media (max-width:700px)"]: {
                        fontSize: "2.2rem ",
                        lineHeight: "36px",
                    },
                    ["@media (max-width:400px)"]: {
                        fontSize: "2rem ",
                        lineHeight: "30px",
                    },
                },
                h2: {
                    fontWeight: 900,
                    letterSpacing: "-2px",
                    lineHeight: "55px",
                    ["@media (max-width:700px)"]: {
                        fontSize: "3.5rem",
                    },
                    ["@media (max-width:500px)"]: {
                        fontSize: "3rem",
                    },
                },
                h1: {
                    lineHeight: "70px",
                    fontSize: "5rem",
                    fontWeight: "900",
                    letterSpacing: "-2px",
                    ["@media (max-width:1500px)"]: {
                        fontSize: "4.5rem",
                        lineHeight: "70px",
                    },
                    ["@media (max-width:700px)"]: {
                        fontSize: "4rem",
                        lineHeight: "55px",
                    },
                    ["@media (max-width:500px)"]: {
                        fontSize: "3.5rem",
                        lineHeight: "50px",
                    },
                    "&.long-text": {
                        lineHeight: "60px",
                        fontSize: "3.5rem",
                        ["@media (max-width:1500px)"]: {
                            fontSize: "3rem",
                            lineHeight: "50px",
                        },
                        ["@media (max-width:700px)"]: {
                            fontSize: "2.5rem",
                            lineHeight: "45px",
                        },
                        ["@media (max-width:600px)"]: {
                            fontSize: "2rem",
                            lineHeight: "35px",
                        },
                    },
                },
                body1: {
                    fontSize: "1.3rem",
                    ["@media (max-width:1500px)"]: {
                        fontSize: "1.1rem",
                    },
                },
                body2: {
                    lineHeight: 1.6,
                    fontSize: "1.1rem",
                    ["@media (max-width:1200px)"]: {
                        fontSize: "1rem",
                    },
                },
            },
        },
    },
});
