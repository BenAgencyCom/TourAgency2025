// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { SplittedContentField } from "@/@types/DestinationDescription";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import SplittedSubfieldField from "@/components/destinations/single/description/_SplittedSubfield";

// Styled components
const SplittedFieldWrapper = styled(Box)({
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
        <SplittedFieldWrapper>
            <SplittedSubfieldField
                data={props.data.left} //
                imageLoader={props.imageLoader}
                typeOfSecondSubfield={props.data.right.type}
            ></SplittedSubfieldField>

            <SplittedSubfieldField
                data={props.data.right} //
                imageLoader={props.imageLoader}
                typeOfSecondSubfield={props.data.left.type}
            ></SplittedSubfieldField>
        </SplittedFieldWrapper>
    );
};

export default SplittedField;