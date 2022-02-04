// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
const InformationWrapper = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});
const HeadersWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});
const ColoredHeader = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.main,
    letterSpacing: "-2",
    fontWeight: 700,
    fontSize: "2rem",
    textTransform: "uppercase",
}));
const BigHeader = styled(Box)({
    fontWeight: 700,
    letterSpacing: "-2",
    fontSize: "150px",
    textTransform: "uppercase",
    lineHeight: "170px",
});
const BottomBarsWrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "0 50px",
});
const BottomBar = styled(Box)(({ theme }) => ({
    background: theme.palette.primary.main,
    height: "3px",
    flexGrow: 1,
    opacity: 0.7,
}));
const Description = styled(Typography)({
    maxWidth: "800px",
    textAlign: "center",
    fontSize: "1.5rem",
});

const Information: FunctionComponent = () => {
    const { country, continent, city, shortDescription } = useAppSelector((state) => state.singleDestination.data);
    return (
        <InformationWrapper>
            <Grow in={true}>
                <HeadersWrapper sx={{ mb: 4 }}>
                    <ColoredHeader component="span">{country}</ColoredHeader>
                    <BigHeader component="span">{city}</BigHeader>
                    <BottomBarsWrapper>
                        <BottomBar></BottomBar>
                        <ColoredHeader component="span" sx={{ mx: 3 }}>
                            {continent}
                        </ColoredHeader>
                        <BottomBar></BottomBar>
                    </BottomBarsWrapper>
                </HeadersWrapper>
            </Grow>

            <Fade in={true}>
                <Description sx={{ transitionDelay: "200ms !important" }}>{shortDescription}</Description>
            </Fade>
        </InformationWrapper>
    );
};

export default Information;
