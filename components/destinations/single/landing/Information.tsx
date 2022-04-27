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
    width: "1200px",
    maxWidth: "calc(100% - 20px)",
});
const ColoredHeader = styled("span")(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: "2rem",
    textTransform: "uppercase",
}));
const BigHeader = styled("h1")({
    fontWeight: 700,
    textTransform: "uppercase",
    fontSize: "9rem",
    lineHeight: "150px",
    textAlign: "center",
    margin: 0,
});
const BottomBar = styled("span")(({ theme }) => ({
    background: theme.palette.primary.main,
    height: "3px",
    opacity: 0.7,
    width: "150px",
}));
const Description = styled("p")({
    width: "100%",
    textAlign: "center",
    fontSize: "1.5rem",
    margin: 0,
    letterSpacing: "1px",
});

const Information: FunctionComponent = () => {
    const { country, city, continent, shortDescription } = useAppSelector((state) => state.singleDestination.data);

    return (
        <InformationWrapper column horizontal="center">
            <Grow in={true}>
                <FlexBox sx={{ mb: 4 }} column horizontal="center">
                    <ColoredHeader className="colored-header">{country}</ColoredHeader>
                    <BigHeader>{city}</BigHeader>

                    <FlexBox center>
                        <BottomBar className="colored-bar"></BottomBar>
                        <ColoredHeader sx={{ mx: "20px" }} className="colored-header">
                            {continent.replace("_", " ")}
                        </ColoredHeader>
                        <BottomBar className="colored-bar"></BottomBar>
                    </FlexBox>
                </FlexBox>
            </Grow>

            <Fade in={true}>
                <Description sx={{ transitionDelay: "200ms !important" }}>{shortDescription}</Description>
            </Fade>
        </InformationWrapper>
    );
};

export default Information;
