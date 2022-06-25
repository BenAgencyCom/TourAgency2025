import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { ParagraphContentField } from "@/@types/Description";
// Material UI Components
import Typography from "@mui/material/Typography";

const Paragraph = styled(Typography)(({ theme }) => ({
    textIndent: "20px",
    marginBottom: theme.spacing(1),
    fontWeight: 300,
    textAlign: "justify",
}));

interface ParagraphFieldProps {
    data: ParagraphContentField;
    split?: true;
    shrink?: boolean;
}

const ParagraphField: FunctionComponent<ParagraphFieldProps> = (props) => {
    const width: number = (() => {
        if (props.split) {
            return props.shrink ? 39 : 49;
        }
        return 100;
    })();

    return (
        <Paragraph
            sx={{
                width: `${width}%`,
            }}
        >
            {props.data.content}
        </Paragraph>
    );
};

export default ParagraphField;
