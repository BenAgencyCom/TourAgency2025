// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Styled Components
const Header = styled(Typography)(({ theme }) => ({
    fontWeight: 900,
    letterSpacing: "-1px",
}));

interface ReadMoreProps {
    title: string;
}
const ReadMore: FunctionComponent<ReadMoreProps> = (props) => {
    const fontSize = (() => {
        const { length } = props.title;
        if (length < 50) return { fontSize: "40px", lineHeight: "40px" };
        else return { fontSize: "2rem", lineHeight: "30px" };
    })();

    return <Header sx={fontSize}>{props.title}</Header>;
};

export default ReadMore;
