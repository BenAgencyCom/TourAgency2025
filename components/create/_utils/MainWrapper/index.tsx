// Tools
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Other components
import CreateProcessStepper from "./CreateProcessStepper";
import NavigationBetweenStages from "./NavigationBetweenStages";
import ContentContainter from "@/components/_utils/styled/ContentContainter";
// Styled components
const Wrapper = styled("section")(({ theme }) => ({
    background: theme.palette.background.default,
    paddingTop: "80px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "20px",
    "div.main-wrapper-content": {
        display: "flex",
        flexDirection: "column",
        maxWidth: "1450px",
        margin: "0 auto",
        flexGrow: "1",
        width: "100vw",
        color: theme.palette.text.primary,
    },

    "div.children-wrapper": {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        marginBottom: "20px",
    },
}));

interface MainWrapperProps {
    steps: string[];
    activeStep: StatedDataField<number>;
    disableContinueButton: boolean;
    alternativeContinueCallback?: () => any;
}

const MainWrapper: FunctionComponent<MainWrapperProps> = (props) => {
    const { disableContinueButton, activeStep, children, steps, alternativeContinueCallback } = props;
    const [alreadyVisitedSteps, setAlreadyVisitedSteps] = useState<Set<number>>(new Set([activeStep.value]));

    useEffect(() => {
        setAlreadyVisitedSteps((val) => {
            val.add(activeStep.value);
            return val;
        });
    }, [activeStep, alreadyVisitedSteps]);

    return (
        <Wrapper id="create-content-wrapper">
            <ContentContainter sx={{ flexGrow: "1" }}>
                <CreateProcessStepper
                    steps={steps} //
                    activeStep={activeStep}
                    disableContinueButton={disableContinueButton}
                    alreadyVisitedSteps={alreadyVisitedSteps}
                />
                <div className="children-wrapper">{children}</div>
                <NavigationBetweenStages
                    disableContinueButton={disableContinueButton} //
                    activeStep={activeStep}
                    alternativeContinueCallback={alternativeContinueCallback}
                ></NavigationBetweenStages>
            </ContentContainter>
        </Wrapper>
    );
};

export default MainWrapper;
