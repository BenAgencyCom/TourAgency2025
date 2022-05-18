// Tools
import { styled } from "@mui/system";
import { useState } from "react";
import stated from "@/utils/client/stated";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import SelectNewContentFieldType from "./SelectNewContentFieldType";
// Styled components
import Button from "@/components/create/_utils/forms/Button";

const Wrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    width: "100%",
});

const DescriptionHeader: FunctionComponent = (props) => {
    const [selectTypeDialog, setSelectTypeDialog] = useState<boolean>(false);

    return (
        <Wrapper sx={{ mb: 2 }} component="header">
            {/*  */}
            <SelectNewContentFieldType open={stated(selectTypeDialog, setSelectTypeDialog)}></SelectNewContentFieldType>

            <Button onClick={() => setSelectTypeDialog(true)}>Add content field</Button>
            <Button sx={{ ml: "10px" }}>Preview</Button>
        </Wrapper>
    );
};

export default DescriptionHeader;
