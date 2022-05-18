// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
import { FieldType } from "@/@types/Description";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// Other components
import SelectFromEnum from "@/components/_utils/SelectFromEnum";
// Redux
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { actions, helpers } from "@/redux/slices/createContent";

const Wrapper = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
});

const FlexBox = styled(Box)({
    display: "flex",
});

const DescriptionHeader: FunctionComponent = (props) => {
    const newFieldType = useAppSelector((store) => store.createContent.newFieldType);
    const { updateNewFieldType } = actions;
    const { addItemWithAutomaticType } = helpers;
    const dispatch = useAppDispatch();

    const updateType = (type: FieldType) => dispatch(updateNewFieldType(type));

    return (
        <Wrapper sx={{ mb: 2 }} component="header">
            <FlexBox>
                <SelectFromEnum
                    enum={FieldType} //
                    value={{ value: newFieldType, setValue: updateType }}
                    props={{
                        sx: { width: "250px" },
                        inputProps: {
                            sx: { py: 0 },
                        },
                    }}
                ></SelectFromEnum>
                <Button
                    variant="contained" //
                    onClick={() => addItemWithAutomaticType()}
                    sx={{ ml: 1 }}
                >
                    Add
                </Button>
            </FlexBox>
        </Wrapper>
    );
};

export default DescriptionHeader;
