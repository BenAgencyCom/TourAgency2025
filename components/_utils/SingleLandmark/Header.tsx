// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Styled Components
const Header = styled("h3")(({ theme }) => ({
    fontWeight: 900,
    letterSpacing: "-1px",
    margin: "0 0 10px 0",
    fontSize: "40px",
    lineHeight: "40px",
}));

interface ReadMoreProps {
    title: string;
}
const SingleLandmarkHeader: FunctionComponent<ReadMoreProps> = (props) => {
    return <Header>{props.title}</Header>;
};

export default SingleLandmarkHeader;
