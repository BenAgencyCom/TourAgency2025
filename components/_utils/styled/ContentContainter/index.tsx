// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { MUIStyledCommonProps } from "@mui/system";
// Other components
import BackgroundMap from "./BackgroundMap";
// Styled Components
const Wrapper = styled("section")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    maxWidth: "1450px",
    margin: "100px auto 0 auto",
    width: "calc(100vw - 200px)",
    padding: "0 20px",
    boxSizing: "border-box",
    color: theme.palette.text.primary,
}));

interface ContentContainterProps extends MUIStyledCommonProps {
    id?: string;
    backgroundMap?: true;
}

const ContentContainter: FunctionComponent<ContentContainterProps> = (props) => {
    const { backgroundMap, children, ...propsToForward } = props;

    return (
        <Wrapper {...propsToForward}>
            {backgroundMap && <BackgroundMap></BackgroundMap>}
            {children}
        </Wrapper>
    );
};

export default ContentContainter;
