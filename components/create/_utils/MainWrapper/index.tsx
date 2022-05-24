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
    /** Array of steps's titles */
    steps: string[];
    /** **index** of active step */
    activeStep: StatedDataField<number>;
    /** Disable **entire** navigation between stages */
    disableNavigation: boolean;
    /** Callback which is supposed to be called instead of going farther on the last step */
    alternativeContinueCallback?: () => any;
    /**
     * Short message whill is going to be displayed on right side of **continue** button,
     * informing user of the reason behind blocking access to change step ensure
     */
    disabledNavigationJustification: string;
}

const MainWrapper: FunctionComponent<MainWrapperProps> = (props) => {
    const { disableNavigation, activeStep, children, steps, alternativeContinueCallback, disabledNavigationJustification } = props;
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
                    disableNavigation={disableNavigation}
                    alreadyVisitedSteps={alreadyVisitedSteps}
                />
                <div className="children-wrapper">{children}</div>
                <NavigationBetweenStages
                    disableNavigation={disableNavigation} //
                    activeStep={activeStep}
                    alternativeContinueCallback={alternativeContinueCallback}
                    disabledNavigationJustification={disabledNavigationJustification}
                ></NavigationBetweenStages>
            </ContentContainter>
        </Wrapper>
    );
};

export default MainWrapper;
