// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import ButtonBase from "@mui/material/ButtonBase";
// Material UI Icons
import Close from "@mui/icons-material/Close";
import Fullscreen from "@mui/icons-material/Fullscreen";
import FullscreenExit from "@mui/icons-material/FullscreenExit";
// Styled components
const TopSideButtonsWrapper = styled("div")(({ theme }) => ({
    position: "absolute",
    zIndex: "2",
    top: "10px",
    right: "0",
    ["@media (max-width:900px)"]: {
        top: "20px",
    },
}));
const SingleButton = styled(ButtonBase)(({ theme }) => ({
    background: theme.palette.primary.main,
    width: "40px",
    height: "40px",
    borderRadius: "3px",
    color: "#fff",
    transition: "background .3s",
    "&:hover": {
        background: theme.palette.primary.dark,
    },
    marginLeft: "10px",
    "&:nth-of-type(1)": {
        ["@media (max-width:1000px)"]: {
            display: "none",
        },
    },
}));

interface TopSideButtonsProps {
    handleCloseModal: () => void;
    handleFullsizeToggle: () => void;
    fullscreenIsOpen: boolean;
}

const TopSideButtons: FunctionComponent<TopSideButtonsProps> = (props) => {
    return (
        <TopSideButtonsWrapper>
            <SingleButton onClick={props.handleFullsizeToggle}>
                {props.fullscreenIsOpen ? <FullscreenExit /> : <Fullscreen />}
                {/*  */}
            </SingleButton>

            <SingleButton onClick={props.handleCloseModal}>
                <Close />
            </SingleButton>
        </TopSideButtonsWrapper>
    );
};

export default TopSideButtons;
