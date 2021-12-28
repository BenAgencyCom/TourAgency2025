// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/DestinationDescription";
import type { StatedDataField } from "@/@types/StagedDataField";
// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// Other components
import SelectFromEnum from "@/components/_utils/SelectFromEnum";

const Wrapper = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
});

const FlexBox = styled(Box)({
    display: "flex",
});

interface DescriptionHeaderProps {
    newContentFieldType: StatedDataField<FieldType>;
    addNewContentField: () => void;
}

const DescriptionHeader: FunctionComponent<DescriptionHeaderProps> = (props) => {
    return (
        <Wrapper sx={{ mb: 2 }} component="header">
            <FlexBox>
                <SelectFromEnum
                    enum={FieldType} //
                    value={props.newContentFieldType}
                    props={{
                        sx: { width: "250px" },
                        inputProps: {
                            sx: { py: 0 },
                        },
                    }}
                ></SelectFromEnum>
                <Button
                    variant="contained" //
                    onClick={props.addNewContentField}
                    sx={{ ml: 1 }}
                >
                    Add
                </Button>
            </FlexBox>

            <FlexBox>
                <Button variant="outlined">Preview</Button>
                <Button variant="outlined" sx={{ ml: 1 }}>
                    Fullscreen
                </Button>
            </FlexBox>
        </Wrapper>
    );
};

export default DescriptionHeader;
