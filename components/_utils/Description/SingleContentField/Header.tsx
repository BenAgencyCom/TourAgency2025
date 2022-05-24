// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { HeaderContentField } from "@/@types/Description";
// Material UI Components
import Typography from "@mui/material/Typography";

const Header = styled(Typography)(({ theme }) => ({
    margin: `${theme.spacing(2)} 0`,
    fontWeight: 700,
    letterSpacing: "-2px",
    paddingLeft: "40px",
    position: "relative",
    marginTop: "60px",
}));
const Dot = styled("span")(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "0",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    border: `3px solid ${theme.palette.primary.main}`,
    boxSizing: "border-box",
    "&::after": {
        content: "''",
        position: "absolute",
        top: "-75%",
        right: "-75%",
        width: "15px",
        height: "15px",
        border: `3px solid ${theme.palette.primary.main}`,
        boxSizing: "border-box",
    },
    "&::before": {
        content: "''",
        position: "absolute",
        bottom: "-75%",
        left: "-75%",
        width: "15px",
        height: "15px",
        border: `3px solid ${theme.palette.primary.main}`,
        boxSizing: "border-box",
    },
}));

interface HeaderContentFieldProps {
    data: HeaderContentField;
}
const HeaderField: FunctionComponent<HeaderContentFieldProps> = (props) => {
    return (
        <Header variant="h3">
            <Dot className="decoration"></Dot>
            <span>{props.data.header}</span>
        </Header>
    );
};

export default HeaderField;
