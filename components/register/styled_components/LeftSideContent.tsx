// Tools
import { styled } from "@mui/system";

export default styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "50%",
    ["@media (max-width:1000px)"]: {
        width: "calc(100vw - 20px)",
        maxWidth: "600px",
    },
    ".MuiFormControl-root": {
        marginTop: "20px",
        width: "100%",
    },
    ".strength-bar": {
        marginTop: "5px",
        width: "100%",
        div: {
            div: {
                height: "4px !important",
            },
        },
    },
}));
