// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
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
    svg: {
        marginRight: "5px",
    },
}));
interface LocalizationProps {
    crumbs: string[];
}
const Localization: FunctionComponent<LocalizationProps> = (props) => {
    const crumbsInTotal = props.crumbs.length;
    return (
        <Wrapper center>
            <LocationOn></LocationOn>
            {props.crumbs.map((item, index) => {
                if (index + 1 === crumbsInTotal) return <span>{item}</span>;
                return (
                    <>
                        <span className="uncolor">{item}</span>
                        <span className="seperator">/</span>
                    </>
                );
            })}
        </Wrapper>
    );
};

export default Localization;
