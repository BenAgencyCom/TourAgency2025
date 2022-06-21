// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
// Material UI Icons
import Close from "@mui/icons-material/Close";
// Redux
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { closeSnackbar } from "@/redux/slices/snackbar";
// Styled components
const StyledAlert = styled(Alert)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    fontSize: "1.1rem",
    "&>.MuiAlert-message": {
        flexGrow: 1,
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        padding: "3px 10px",
    },
}));

const AppSnackbar: FunctionComponent<{}> = () => {
    const GLOBAL_THIS_PROPERTY = "_snackbar_timeout";

    const dispatch = useAppDispatch();
    const display = useAppSelector((state) => state.snackbar.display);
    const msg = useAppSelector((state) => state.snackbar.msg);
    const severity = useAppSelector((state) => state.snackbar.severity);
    const hideAfter = useAppSelector((state) => state.snackbar.hideAfter);

    if (hideAfter) {
        if ((globalThis as any)[GLOBAL_THIS_PROPERTY]) clearTimeout((globalThis as any)[GLOBAL_THIS_PROPERTY]);
        (globalThis as any)[GLOBAL_THIS_PROPERTY] = setTimeout(() => {
            dispatch(closeSnackbar());
        }, hideAfter);
    }

    return (
        <Snackbar
            open={display} //
            sx={{ zIndex: 2000 }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            data-cy="snackbar"
            data-cy-severity={severity}
        >
            <StyledAlert
                severity={severity} //
                variant="filled"
            >
                <span>{msg}</span>
                <Tooltip title="Close">
                    <IconButton
                        data-cy="snackbar-close" //
                        onClick={() => dispatch(closeSnackbar())}
                    >
                        <Close sx={{ color: "#fff" }} />
                    </IconButton>
                </Tooltip>
            </StyledAlert>
        </Snackbar>
    );
};

export default AppSnackbar;
