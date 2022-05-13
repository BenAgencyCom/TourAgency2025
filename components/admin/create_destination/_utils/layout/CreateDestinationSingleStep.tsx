// Tools
import { styled } from "@mui/system";
// Types
import type { StatedDataField } from "@/@types/StatedDataField";
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Other components
import BottomNavigation from "@/components/admin/create_destination/_utils/layout/BottomNavigation";
import SectionHeader from "@/components/admin/create_destination/_utils/layout/SectionHeader";
// Styled components
const SingleStepWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100vw",
    maxWidth: "850px",
    color: theme.palette.text.primary,
}));

const Content = styled(Box)({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    position: "relative",
});

interface CreateDestinationSingleStepProps {
    children: ReactNode;
    header: string;
    blockGoingForward: boolean;
    // Optional
    contentSX?: Record<string, unknown>;
    continueMsg?: string;
    disableNavigationButtons?: boolean;
    // Auxiliary
    stepperIndex: StatedDataField<number>;
    continueAction?: () => void;
}

const CreateDestinationSingleStep: FunctionComponent<CreateDestinationSingleStepProps> = (props) => {
    return (
        <Fade in={true}>
            <SingleStepWrapper component="section">
                <SectionHeader text={props.header}></SectionHeader>
                {/*  */}
                <Content sx={props.contentSX}>{props.children}</Content>
                {/*  */}
                <BottomNavigation
                    continueMsg={props.continueMsg}
                    blockContinue={props.blockGoingForward} //
                    currentSlideIndex={props.stepperIndex.value}
                    updateSlideIndex={props.stepperIndex.setValue}
                    disableNavigationButtons={props.disableNavigationButtons}
                    continueAction={props.continueAction}
                ></BottomNavigation>
            </SingleStepWrapper>
        </Fade>
    );
};

export default CreateDestinationSingleStep;
