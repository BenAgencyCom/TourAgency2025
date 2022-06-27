// Tools
import { useState, useEffect } from "react";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other components
import GoogleReCAPTCHA from "@/components/_utils/GoogleReCAPTCHA";
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { actions as createContentActions } from "@/redux/slices/createContent";

const Confirmation: FunctionComponent = (props) => {
    const dispatch = useAppDispatch();
    const [ReCAPTCHAIsApproved, setReCAPTCHAIsApproved] = useState<boolean>(true);

    useEffect(() => {
        dispatch(
            createContentActions.handleValidationResult({
                disableNavigation: !ReCAPTCHAIsApproved,
                reason: "you have to prove that you are a human",
            })
        );
    }, [dispatch, ReCAPTCHAIsApproved]);

    return (
        <>
            {props.children}
            <Typography variant="body2" sx={{ mb: "10px" }}>
                This landmark will not be visible to public immediately, because it has to be approved by the administrator first.
            </Typography>
            <GoogleReCAPTCHA setReCAPTCHAIsApproved={setReCAPTCHAIsApproved} />
        </>
    );
};

export default Confirmation;
