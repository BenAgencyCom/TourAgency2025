// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import IconButton from "@mui/material/IconButton";
// Material UI Icons
import Menu from "@mui/icons-material/Menu";

const MobileButton = styled(IconButton)(({ theme }) => ({
    position: "relative",
    fontSize: "3rem",
    zIndex: "1",
}));

interface MobileMenuButtonProps {
    onClick: () => any;
}

const MobileMenuButton: FunctionComponent<MobileMenuButtonProps> = (props) => {
    return (
        <MobileButton color="primary" onClick={props.onClick} id="mobile-menu-opener">
            <Menu sx={{ fontSize: "inherit" }}></Menu>
        </MobileButton>
    );
};

export default MobileMenuButton;
