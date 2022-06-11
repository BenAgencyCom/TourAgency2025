// Types
import type { DisplaySnackbarParams } from "@/redux/slices/snackbar";
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { displaySnackbar } from "@/redux/slices/snackbar";

/**
 * Usage:
 * ```ts
 *  const displaySnackbar = useSnackbar();
 * ```
 *  And subsequently
 * ```ts
 *  displaySnackbar({
 *      msg: `Credentials ${e.target.checked ? "will" : "won't"} be saved`,
 *      severity: "success",
 *      hideAfter: 1500,
 *  });
 * ```
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default (): ((params: DisplaySnackbarParams) => void) => {
    const dispatch = useAppDispatch();

    return (params: DisplaySnackbarParams) => {
        dispatch(displaySnackbar(params));
    };
};
