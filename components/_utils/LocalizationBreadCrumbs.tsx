// Tools
import { styled } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
// Material UI Icons
import LocationOn from "@mui/icons-material/LocationOn";
// Styled Components
const Wrapper = styled("div")(({ theme }) => ({
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 500,
    fontSize: "1.1rem",
    margin: "10px 0 0 0",
    "span.seperator": {
        margin: "0 5px",
        fontSize: "1.2rem",
    },
    "span.uncolor": {
        color: theme.palette.text.primary,
    },
    svg: {
        marginRight: "5px",
    },
    ["@media (max-width:600px)"]: {
        fontSize: "1.1rem",
    },
}));
interface LocalizationProps {
    crumbs: string[];
    sx?: SxProps;
}
const Localization: FunctionComponent<LocalizationProps> = (props) => {
    const crumbsInTotal = props.crumbs.length;

    return (
        <Wrapper sx={props.sx} className="localization-breadcrumbs">
            <LocationOn></LocationOn>
            {props.crumbs.map((item, index) => {
                if (index + 1 === crumbsInTotal) return <span key={index}>{item}</span>;
                return (
                    <span key={index}>
                        <span className="uncolor">{item}</span>
                        <span className="seperator">/</span>
                    </span>
                );
            })}
        </Wrapper>
    );
};

export default Localization;
