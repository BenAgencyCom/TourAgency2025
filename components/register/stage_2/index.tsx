// Tools
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
// Other components
import Link from "next/link";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import StyledCheckboxWrapper from "@/components/_utils/styled/StyledCheckboxWrapper";

const StyledLinkBase = styled("span")(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 700,
    cursor: "pointer",
    marginLeft: "5px",
}));

interface RegisterStage2Props {
    disableContinueButton: StatedDataField<boolean>;
}

const RegisterStage2: FunctionComponent<RegisterStage2Props> = (props) => {
    const [ReCAPTCHAIsApproved, setReCAPTCHAIsApproved] = useState<boolean>(true);
    const [termsOfServicesHasBeenAccepted, setTermsOfServicesHasBeenAccepted] = useState<boolean>(false);

    const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked);
        setTermsOfServicesHasBeenAccepted(e.target.checked);
    };

    useEffect(() => {
        props.disableContinueButton.setValue(!ReCAPTCHAIsApproved || !termsOfServicesHasBeenAccepted);
    }, [ReCAPTCHAIsApproved, props.disableContinueButton, termsOfServicesHasBeenAccepted]);

    return (
        <FlexBox column>
            <Typography variant="body2">
                One last step before creating an account is to read and accpet the
                <StyledLinkBase>
                    <Link href="/terms-of-services" passHref>
                        <span>terms of services and privacy policy</span>
                    </Link>
                </StyledLinkBase>
            </Typography>

            <StyledCheckboxWrapper
                control={<Checkbox checked={termsOfServicesHasBeenAccepted} onChange={onChecked} />} //
                label="I'm acknowledged"
                sx={{ my: "5px" }}
            />
        </FlexBox>
    );
};

export default RegisterStage2;
