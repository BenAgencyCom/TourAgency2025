import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { ParagraphContentField } from "@/@types/DestinationDescription";
// Material UI Components
import Typography from "@mui/material/Typography";

const Paragraph = styled(Typography)(({ theme }) => ({
    textIndent: "20px",
    marginBottom: theme.spacing(1),
    fontSize: "1.1rem",
}));

interface ParagraphFieldProps {
    data: ParagraphContentField;
}

const ParagraphField: FunctionComponent<ParagraphFieldProps> = (props) => {
    return <Paragraph>{props.data.content}</Paragraph>;
};

export default ParagraphField;
