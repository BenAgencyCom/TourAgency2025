// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Types
import type { Landmark } from "@/@types/pages/destinations/SingleDestination";
// Material UI Icons
import LocationOn from "@mui/icons-material/LocationOn";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";
const Wrapper = styled(FlexBox)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "1.2rem",
    margin: "10px 0 5px 0",
    "span.seperator": {
        margin: "0 5px",
        fontSize: "1.3rem",
    },
    "span.uncolor": {
        color: theme.palette.text.primary,
    },
}));
interface LocalizationProps {
    destination: Landmark["destination"];
}
const Localization: FunctionComponent<LocalizationProps> = (props) => {
    return (
        <Wrapper center>
            <LocationOn></LocationOn>
            <span className="uncolor">{props.destination.country}</span>
            <span className="seperator">/</span>
            <span>{props.destination.city}</span>
        </Wrapper>
    );
};

export default Localization;
