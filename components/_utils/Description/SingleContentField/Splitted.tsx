// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { SplittedContentField } from "@/@types/Description";
// Other components
import SplittedSubfieldField from "./_SplittedSubfield";
// Styled components
const SplittedFieldWrapper = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    minHeight: "300px",
});

interface SplittedFieldProps {
    data: SplittedContentField;
    imageLoader: (url: string) => string;
}

const SplittedField: FunctionComponent<SplittedFieldProps> = (props) => {
    return (
        <SplittedFieldWrapper className="splitted-content-field">
            <SplittedSubfieldField
                data={props.data.left} //
                imageLoader={props.imageLoader}
                typeOfSecondSubfield={props.data.right.type}
                side="left"
            ></SplittedSubfieldField>

            <SplittedSubfieldField
                data={props.data.right} //
                imageLoader={props.imageLoader}
                typeOfSecondSubfield={props.data.left.type}
                side="right"
            ></SplittedSubfieldField>
        </SplittedFieldWrapper>
    );
};

export default SplittedField;
