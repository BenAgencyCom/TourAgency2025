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

const AppSnackbar: FunctionComponent<{}> = () => {
    const dispatch = useAppDispatch();
    const display = useAppSelector((state) => state.snackbar.display);
    const msg = useAppSelector((state) => state.snackbar.msg);
    const severity = useAppSelector((state) => state.snackbar.severity);
    const hideAfter = useAppSelector((state) => state.snackbar.hideAfter);

    if (hideAfter) {
        setTimeout(() => {
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
            <Alert
                severity={severity} //
                variant="filled"
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    "&>.MuiAlert-message": {
                        flexGrow: 1,
                        justifyContent: "space-between",
                        display: "flex",
                        alignItems: "center",
                    },
                }}
            >
                <span>{msg}</span>
                <Tooltip title="Close">
                    <IconButton
                        data-cy="snackbar-close" //
                        onClick={() => dispatch(closeSnackbar())}
                    >
                        <Close></Close>
                    </IconButton>
                </Tooltip>
            </Alert>
        </Snackbar>
    );
};

export default AppSnackbar;
