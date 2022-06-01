// Types
import type { Headers } from "../@types";
import type { FunctionComponent } from "react";
// Material UI Components
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import { BigHeader, BottomBar, ColoredHeader, Description, InformationWrapper } from "./styled_components";

interface InformationProps {
    headers: Headers;
    text: string;
}

const Information: FunctionComponent<InformationProps> = (props) => {
    return (
        <InformationWrapper column horizontal="center" className="information">
            <Grow in={true}>
                <FlexBox sx={{ mb: 4 }} column horizontal="center">
                    <ColoredHeader className="colored-header">{props.headers.top}</ColoredHeader>
                    <BigHeader className={props.headers.main.length > 30 ? "long-text" : ""}>{props.headers.main}</BigHeader>

                    <FlexBox center>
                        <BottomBar className="colored-bar"></BottomBar>
                        <ColoredHeader sx={{ mx: "20px" }} className="colored-header">
                            {props.headers.bottom}
                        </ColoredHeader>
                        <BottomBar className="colored-bar"></BottomBar>
                    </FlexBox>
                </FlexBox>
            </Grow>

            <Fade in={true}>
                <Description sx={{ transitionDelay: "200ms !important" }}>{props.text}</Description>
            </Fade>
        </InformationWrapper>
    );
};

export default Information;
