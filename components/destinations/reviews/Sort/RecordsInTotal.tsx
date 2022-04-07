// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Styled components
const Wrapper = styled("h3")(({ theme }) => ({
    margin: "0",
    letterSpacing: "-1px",
    fontWeight: 700,
    fontSize: "1.8rem",
    strong: {
        color: theme.palette.primary.main,
    },
}));

const RecordsInTotal: FunctionComponent<{ recordsInTotal: number }> = (props) => {
    return (
        <Wrapper>
            <span>Reviews in total: </span>
            <strong>{props.recordsInTotal}</strong>
        </Wrapper>
    );
};

export default RecordsInTotal;
