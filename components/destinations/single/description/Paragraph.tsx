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
    split?: true;
}

const ParagraphField: FunctionComponent<ParagraphFieldProps> = (props) => {
    return (
        <Paragraph
            sx={{
                width: `${props.split ? 49 : 100}%`,
                mt: props.split ? 0 : 2,
            }}
        >
            {props.data.content}
        </Paragraph>
    );
};

export default ParagraphField;
