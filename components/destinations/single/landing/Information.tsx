// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const InformationWrapper = styled(FlexBox)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 2,
});
const ColoredHeader = styled("span")(({ theme }) => ({
    color: theme.palette.primary.main,
    letterSpacing: "-2",
    fontWeight: 700,
    fontSize: "2rem",
    textTransform: "uppercase",
}));
const BigHeader = styled("h1")({
    fontWeight: 700,
    letterSpacing: "-2",
    fontSize: "150px",
    textTransform: "uppercase",
    lineHeight: "170px",
    textAlign: "center",
    margin: 0,
});
const BottomBarsWrapper = styled(FlexBox)({
    width: "100%",
    padding: "0 50px",
});
const BottomBar = styled("span")(({ theme }) => ({
    background: theme.palette.primary.main,
    height: "3px",
    flexGrow: 1,
    opacity: 0.7,
}));
const Description = styled("p")({
    maxWidth: "800px",
    textAlign: "center",
    fontSize: "1.5rem",
    margin: 0,
});

const Information: FunctionComponent = () => {
    const { country, continent, city, shortDescription } = useAppSelector((state) => state.singleDestination.data);
    return (
        <InformationWrapper column horizontal="center">
            <Grow in={true}>
                <FlexBox sx={{ mb: 4 }} column horizontal="center">
                    <ColoredHeader>{country}</ColoredHeader>
                    <BigHeader>{city}</BigHeader>

                    <BottomBarsWrapper center>
                        <BottomBar></BottomBar>
                        <ColoredHeader sx={{ mx: 3 }}>{continent}</ColoredHeader>
                        <BottomBar></BottomBar>
                    </BottomBarsWrapper>
                </FlexBox>
            </Grow>

            <Fade in={true}>
                <Description sx={{ transitionDelay: "200ms !important" }}>{shortDescription}</Description>
            </Fade>
        </InformationWrapper>
    );
};

export default Information;
