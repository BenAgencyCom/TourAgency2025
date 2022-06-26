// Tools
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import { Fade } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
// Other components
import Link from "next/link";
import GoogleReCAPTCHA from "@/components/_utils/GoogleReCAPTCHA";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import StyledCheckboxWrapper from "@/components/_utils/styled/StyledCheckboxWrapper";

const StyledLinkBase = styled("span")(({ theme }) => ({
    cursor: "pointer",
    marginLeft: "5px",
    a: {
        fontWeight: 700,
        color: theme.palette.primary.main,
    },
}));

interface RegisterStage2Props {
    disableContinueButton: StatedDataField<boolean>;
}

const RegisterStage2: FunctionComponent<RegisterStage2Props> = (props) => {
    const [ReCAPTCHAIsApproved, setReCAPTCHAIsApproved] = useState<boolean>(false);
    const [termsOfServicesHasBeenAccepted, setTermsOfServicesHasBeenAccepted] = useState<boolean>(false);

    const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setTermsOfServicesHasBeenAccepted(e.target.checked);
    };

    useEffect(() => {
        props.disableContinueButton.setValue(!ReCAPTCHAIsApproved || !termsOfServicesHasBeenAccepted);
    }, [ReCAPTCHAIsApproved, props.disableContinueButton, termsOfServicesHasBeenAccepted]);

    return (
        <Fade in={true}>
            <FlexBox column>
                <Typography variant="body2">
                    One last step before creating an account is to read and accpet the
                    <StyledLinkBase>
                        <Link href="/terms-of-services" passHref>
                            <a target="_blank" rel="noopener noreferrer">
                                terms of services
                            </a>
                        </Link>
                        <span> and </span>
                        <Link href="/privacy-policy" passHref>
                            <a target="_blank" rel="noopener noreferrer">
                                privacy policy
                            </a>
                        </Link>
                    </StyledLinkBase>
                </Typography>
                <StyledCheckboxWrapper
                    control={<Checkbox checked={termsOfServicesHasBeenAccepted} onChange={onChecked} />} //
                    label="I'm acknowledged"
                    sx={{ m: "5px 0 20px 0" }}
                />

                <GoogleReCAPTCHA setReCAPTCHAIsApproved={setReCAPTCHAIsApproved} />
            </FlexBox>
        </Fade>
    );
};

export default RegisterStage2;
