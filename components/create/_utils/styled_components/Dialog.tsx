// Tools
import { styled } from "@mui/system";
// Material UI Components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

export const StyledDialogBase = styled(Dialog)(({ theme }) => ({
    ".MuiPaper-root": {
        background: "#fff",
        maxWidth: "600px",
        width: "calc(100% - 20px)",
        overflow: "hidden",
        margin: "0 !important",
    },
}));
export const BackgroundIcon = styled("span")(({ theme }) => ({
    position: "absolute",
    bottom: "-60px",
    right: "-0px",
    fontSize: "13rem",
    zIndex: 1,
    opacity: 0.1,
    svg: {
        fontSize: "inherit",
    },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    fontSize: "1.5rem", //
    position: "relative",
    zIndex: "2",
    userSelect: "none",
}));
export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    fontSize: "1.3rem", //
    position: "relative",
    zIndex: "2",
    ["@media (max-width: 900px)"]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));
export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    justifyContent: "flex-start", //
    paddingLeft: "24px",
    position: "relative",
    zIndex: "2",
    ["@media (max-width: 900px)"]: {
        alignItems: "center",
        flexDirection: "column",
        button: {
            margin: "10px 0 0 0 !important",
            minWidth: "300px",
            "&:nth-of-type(1)": {
                marginTop: "0 !important",
            },
        },
    },
}));
