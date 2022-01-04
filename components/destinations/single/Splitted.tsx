// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { SplittedContentField } from "@/@types/DestinationDescription";
// Material UI Components
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
// Other components
import SplittedSubfieldField from "@/components/destinations/single/_SplittedSubfield";

// Styled components
const SplittedFieldWrapper = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    minHeight: "380px",
}));

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
            ></SplittedSubfieldField>

            <Divider flexItem sx={{ mx: 2 }} orientation="vertical"></Divider>

            <SplittedSubfieldField
                data={props.data.right} //
                imageLoader={props.imageLoader}
            ></SplittedSubfieldField>
        </SplittedFieldWrapper>
    );
};

export default SplittedField;
