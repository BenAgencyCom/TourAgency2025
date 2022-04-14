// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Styled components
const Wrapper = styled("h3")(({ theme }) => ({
    margin: "0",
    fontWeight: 300,
    marginLeft: "20px",
    fontSize: "1.5rem",
    strong: {
        color: theme.palette.primary.main,
    },
}));

const ResultsInTotal: FunctionComponent = (props) => {
    return (
        <Wrapper>
            <span>Results in total: </span>
            <strong>{props.children}</strong>
        </Wrapper>
    );
};

export default ResultsInTotal;
