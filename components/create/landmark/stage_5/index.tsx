// Tools
import { useState, useEffect } from "react";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import GoogleReCAPTCHA from "@/components/_utils/GoogleReCAPTCHA";
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { actions as createContentActions } from "@/redux/slices/createContent";

const StageFive: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [ReCAPTCHAIsApproved, setReCAPTCHAIsApproved] = useState<boolean>(false);

    useEffect(() => {
        dispatch(
            createContentActions.handleValidationResult({
                disableNavigation: !ReCAPTCHAIsApproved,
                reason: "you have to prove that you are a human",
            })
        );
    }, [dispatch, ReCAPTCHAIsApproved]);

    return (
        <Fade in={true}>
            <div>
                <StageHeader title="Confirmation" stageNumber={5}></StageHeader>
                <Typography variant="body2" sx={{ mb: "10px" }}>
                    This landmark will not be visible to public immediately, because it has to be approved by the administrator first.
                </Typography>
                <GoogleReCAPTCHA setReCAPTCHAIsApproved={setReCAPTCHAIsApproved} />
            </div>
        </Fade>
    );
};

export default StageFive;
