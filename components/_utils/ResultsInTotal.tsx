// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { MUIStyledCommonProps } from "@mui/system";
// Styled Components
const RecordsInTotalWrapper = styled("span")(({ theme }) => ({
    margin: "0px 0 40px 0",
    display: "block",
    fontSize: "1.2rem",
    strong: {
        color: theme.palette.primary.main,
        fontWeigt: 900,
    },
}));

interface ResultInTotalProps extends MUIStyledCommonProps {
    resultsInTotal: number;
}
const ResultInTotal: FunctionComponent<ResultInTotalProps> = (props) => {
    const { resultsInTotal, ...propsToForward } = props;
    return (
        <RecordsInTotalWrapper {...propsToForward}>
            There {resultsInTotal === 1 ? "is" : "are"} <strong>{resultsInTotal}</strong> result in total
        </RecordsInTotalWrapper>
    );
};

export default ResultInTotal;
