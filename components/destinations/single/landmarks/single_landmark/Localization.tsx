// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Material UI Icons
import LocationOn from "@mui/icons-material/LocationOn";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";
const Wrapper = styled(FlexBox)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "1.2rem",
    margin: "10px 0 5px 0",
}));
interface LocalizationProps {
    children: ReactNode;
}
const Localization: FunctionComponent<LocalizationProps> = (props) => {
    return (
        <Wrapper center>
            <LocationOn></LocationOn>
            <span>{props.children}</span>
        </Wrapper>
    );
};

export default Localization;
