// Tools
import { styled } from "@mui/system";
import useWindowSizes from "@/hooks/useWindowSizes";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import ContinueButton from "./ContinueButton";
import SectionHeader from "@/components/_utils/Section/SectionHeader";
// Styled Components
const Wrapper = styled(Box)({
    width: "100%",
    padding: "100px 0",
    position: "relative",
    overflow: "hidden",
    ["@media (max-width:600px)"]: {
        padding: "50px 0",
    },
});
const Container = styled("div")(({ theme }) => ({
    width: "1450px",
    maxWidth: "calc(100vw - 400px)",
    margin: "0 auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    zIndex: 2,
    ["@media (max-width:1400px)"]: {
        maxWidth: "calc(100vw - 340px)",
    },
    ["@media (max-width:1300px)"]: {
        maxWidth: "calc(100vw - 300px)",
    },
    ["@media (max-width:1000px)"]: {
        maxWidth: "calc(100vw - 100px)",
    },
    ["@media (max-width:800px)"]: {
        maxWidth: "calc(100vw - 40px)",
    },
    ["@media (max-width:600px)"]: {
        maxWidth: "calc(100vw - 0px)",
    },
}));

interface SectionProps {
    mobileIcon: ReactNode;
    id: string;
    background: string;
    header: {
        text: string;
        buttonMsg?: string;
        biggerHeader?: string;
        onClick?: () => void;
        url?: string;
    };
    // Optional
    fadeThresholdRatio?: number;
    sx?: SxProps;
}
const Section: FunctionComponent<SectionProps> = (props) => {
    const { width } = useWindowSizes();

    return (
        <Wrapper
            id={props.id} //
            component="section"
            sx={{ background: props.background, ...props.sx }}
        >
            <Container>
                <SectionHeader
                    header={props.header.text} //
                    buttonMsg={width > 1000 ? props.header.buttonMsg : undefined}
                    onClick={width > 1000 ? props.header.onClick : undefined}
                    url={width > 1000 ? props.header.url : undefined}
                    biggerHeader={props.header.biggerHeader}
                    mobileIcon={props.mobileIcon}
                ></SectionHeader>
                {props.children}

                {(() => {
                    if (width <= 1000 && props.header.buttonMsg) {
                        return (
                            <ContinueButton
                                buttonMsg={props.header.buttonMsg} //
                                onClick={props.header.onClick}
                                url={props.header.url}
                                sx={{
                                    alignSelf: "center",
                                    marginTop: "50px",
                                }}
                            ></ContinueButton>
                        );
                    }
                })()}
            </Container>
        </Wrapper>
    );
};

export default Section;
