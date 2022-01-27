import { useState, useEffect, useRef } from "react";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StagedDataField";
// Material UI Components
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// Other components
import Loading from "@/components/_utils/Loading";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/Image";
import CreateDestinationSingleStep from "@/components/admin/create_destination/_utils/layout/CreateDestinationSingleStep";
// Styled components
const ImageWrapper = styled(Box)(({ theme }) => ({
    width: "300px",
    height: "100vh",
    maxHeight: "300px",
    position: "relative",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    transition: "all .3s",
}));

const PendingScreen = styled(Box)({
    position: "absolute",
    top: "0px",
    right: "0px",
    zIndex: "1",
});
interface ConfirmationProps {
    // Auxiliary
    stepperIndex: StatedDataField<number>;
}

const Confirmation: FunctionComponent<ConfirmationProps> = (props) => {
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const [pending, setPending] = useState<boolean>(false);
    const [RECAPTCHAVerified, SetRECAPTCHAVerified] = useState<boolean>(false);

    useEffect(() => {
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
    }, []);
    const onReCAPTCHAChange = (captchaCode: unknown) => {
        if (!captchaCode) {
            return SetRECAPTCHAVerified(false);
        }
        SetRECAPTCHAVerified(true);
        setPending(true);
    };

    const siteKey = (): string => {
        try {
            return (window as any).Cypress ? "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" : (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string);
        } catch (e: unknown) {
            return "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
        }
    };

    return (
        <CreateDestinationSingleStep
            stepperIndex={props.stepperIndex} //
            header="One more step"
            blockGoingForward={!RECAPTCHAVerified}
            continueMsg="Create!"
            contentSX={{
                alignItems: "center",
            }}
            disableNavigationButtons={pending}
        >
            <ImageWrapper
                sx={
                    pending
                        ? {
                              width: "500px",
                              maxHeight: "500px",
                          }
                        : {}
                }
            >
                <Image src="/logo2.png" unoptimized alt="globe" layout="fill"></Image>
            </ImageWrapper>

            {(() => {
                if (pending) {
                    return (
                        <>
                            <PendingScreen>
                                <Loading></Loading>
                            </PendingScreen>
                            <Divider flexItem sx={{ my: 2 }}></Divider>
                            <Typography
                                variant="h5" //
                                sx={{ fontWeight: "bold" }}
                            >
                                Please wait until the creation proccess will be over
                            </Typography>
                        </>
                    );
                } else
                    return (
                        <>
                            <Divider flexItem sx={{ my: 2 }}></Divider>
                            <Typography variant="body1" align="center">
                                Before creating a new destination and related to them landmarks you have to confirm, that you are actually a human
                            </Typography>
                            <Divider flexItem sx={{ my: 2 }}></Divider>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={siteKey()}
                                onChange={onReCAPTCHAChange} //
                                theme="dark"
                            />
                        </>
                    );
            })()}
        </CreateDestinationSingleStep>
    );
};

export default Confirmation;
