// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Other components
import CreateProcessStepper from "./CreateProcessStepper";
// Styled components
const Wrapper = styled("section")(({ theme }) => ({
    background: theme.palette.background.default,
    paddingTop: "180px",
    minHeight: "100vh",
    "div.main-wrapper-content": {
        maxWidth: "1450px",
        margin: "0 auto",
        width: "100vw",
        color: theme.palette.text.primary,
    },
    display: "flex",
    flexDirection: "column",
}));

interface MainWrapperProps {
    steps: string[];
    activeSectionIndex: number;
}

const MainWrapper: FunctionComponent<MainWrapperProps> = (props) => {
    return (
        <Wrapper>
            <div className="main-wrapper-content">
                <CreateProcessStepper steps={props.steps} active={props.activeSectionIndex} />
                {props.children}
            </div>
        </Wrapper>
    );
};

export default MainWrapper;
