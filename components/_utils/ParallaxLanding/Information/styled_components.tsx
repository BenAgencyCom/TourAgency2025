// Tools
import { styled } from "@mui/system";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

export const InformationWrapper = styled(FlexBox)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 2,
    width: "1200px",
    maxWidth: "calc(100% - 20px)",
});
export const ColoredHeader = styled("span")(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: "1.7rem",
    textTransform: "uppercase",
}));
export const BigHeader = styled("h1")({
    fontWeight: 700,
    textTransform: "uppercase",
    textAlign: "center",
    margin: 0,
});
export const BottomBar = styled("span")(({ theme }) => ({
    background: theme.palette.primary.main,
    height: "3px",
    opacity: 0.7,
    width: "150px",
}));
export const Description = styled("p")({
    width: "100%",
    textAlign: "center",
    fontSize: "1.3rem",
    margin: 0,
    letterSpacing: "1px",
});
