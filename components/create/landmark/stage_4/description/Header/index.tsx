// Tools
import { useState } from "react";
import { styled } from "@mui/system";
import stated from "@/utils/client/stated";
// Types
import type { FunctionComponent } from "react";
// Other components
import SelectNewContentFieldType from "./SelectNewContentFieldType";
// Styled components
import Button from "@/components/create/_utils/forms/Button";

const Wrapper = styled("header")({
    display: "flex",
    alignItems: "center",
    width: "100%",
});

const DescriptionHeader: FunctionComponent = (props) => {
    const [selectTypeDialog, setSelectTypeDialog] = useState<boolean>(false);

    return (
        <Wrapper sx={{ mb: 2 }}>
            <SelectNewContentFieldType open={stated(selectTypeDialog, setSelectTypeDialog)}></SelectNewContentFieldType>

            <Button onClick={() => setSelectTypeDialog(true)}>Add content field</Button>
            <Button sx={{ ml: "10px" }}>Preview</Button>
        </Wrapper>
    );
};

export default DescriptionHeader;
