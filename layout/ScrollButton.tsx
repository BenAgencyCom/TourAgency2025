// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
import ButtonBase from "@mui/material/ButtonBase";
// Material UI Icons
import ArrowUpward from "@mui/icons-material/ArrowUpward";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
const ScrollBtn = styled(ButtonBase)(({ theme }) => ({
    position: "fixed",
    bottom: "50px",
    right: "50px",
    zIndex: 10,
    width: "50px",
    height: "50px",
    backgroundColor: theme.palette.primary.main,
    transition: "background-color .3s, opacity .3s !important",
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
    fontSize: "2rem",
    borderRadius: "50%",
    svg: {
        color: theme.palette.text.primary,
    },
}));

const ScrollButton: FunctionComponent = () => {
    const { scrollY } = useAppSelector((state) => state.windowSizes);
    const handleScroll = () => scrollTo({ left: 0, top: 0, behavior: "smooth" });

    return (
        <Fade in={scrollY > 100}>
            <ScrollBtn onClick={handleScroll}>
                <ArrowUpward sx={{ fontSize: "inherit" }}></ArrowUpward>
            </ScrollBtn>
        </Fade>
    );
};

export default ScrollButton;
