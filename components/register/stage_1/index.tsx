// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Other components
import PersonalData from "@/components/register/stage_1/PersonalData";
import Credentials from "@/components/register/stage_1/Credentials";
import Avatar from "@/components/register/stage_1/Avatar";
// Styled components
import LeftSideContent from "@/components/register/stage_1/styled_components/LeftSideContent";

const RightSide = styled("div")(({ theme }) => ({}));

const RegisterStage1: FunctionComponent = () => {
    return (
        <>
            <LeftSideContent>
                <PersonalData />
                <Credentials />
            </LeftSideContent>

            <RightSide>
                <Avatar />
            </RightSide>
        </>
    );
};

export default RegisterStage1;
