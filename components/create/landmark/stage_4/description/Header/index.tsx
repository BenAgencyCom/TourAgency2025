// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import { StatedDataField } from "@/@types/StatedDataField";
// Other components
import SelectNewContentFieldType from "./SelectNewContentFieldType";
// Styled components
import Button from "@/components/create/_utils/forms/Button";

const Wrapper = styled("header")({
    display: "flex",
    alignItems: "center",
    width: "100%",
});

interface DescriptionHeaderProps {
    addNewContentFieldDialog: StatedDataField<boolean>;
}
const DescriptionHeader: FunctionComponent<DescriptionHeaderProps> = (props) => {
    return (
        <Wrapper sx={{ mb: 2 }}>
            <SelectNewContentFieldType open={props.addNewContentFieldDialog}></SelectNewContentFieldType>

            <Button onClick={() => props.addNewContentFieldDialog.setValue(true)}>Add content field</Button>
            <Button sx={{ ml: "10px" }}>Preview</Button>
        </Wrapper>
    );
};

export default DescriptionHeader;
