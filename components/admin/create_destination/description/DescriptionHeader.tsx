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
import DescriptionPreview from "@/components/admin/create_destination/description/DescriptionPreview";
// Redux
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { actions, helpers } from "@/redux/slices/create_destination/description";

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
    previewDialog?: StatedDataField<boolean>;
    setFullscreen: StatedDataField<boolean>["setValue"] | false;
    children?: ReactNode;
}

const DescriptionHeader: FunctionComponent<DescriptionHeaderProps> = (props) => {
    const description = useAppSelector((state) => state.description.list);
    const newFieldType = useAppSelector((store) => store.description.newFieldType);
    const { updateNewFieldType } = actions;
    const { addItemWithAutomaticType } = helpers;
    const dispatch = useAppDispatch();

    const updateType = (type: FieldType) => dispatch(updateNewFieldType(type));

    return (
        <>
            {/* Dialogs: */}

            {(() => {
                if (props.previewDialog !== undefined) {
                    return (
                        <DescriptionPreview
                            open={props.previewDialog} //
                            data={description.map((target) => target.data)}
                        ></DescriptionPreview>
                    );
                }
            })()}

            {/* Actual Header */}

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

                <FlexBox>
                    {(() => {
                        if (props.previewDialog !== undefined) {
                            return (
                                <Button
                                    variant="outlined" //
                                    onClick={() => props.previewDialog?.setValue(true)}
                                    sx={{ mr: 1 }}
                                    disabled={description.length === 0}
                                >
                                    Preview
                                </Button>
                            );
                        }
                    })()}

                    {(() => {
                        if (props.children) {
                            return props.children;
                        } else {
                            return (
                                <Button
                                    variant="outlined" //
                                    onClick={() => props.setFullscreen !== false && props.setFullscreen(true)}
                                    disabled={description.length === 0}
                                >
                                    Fullscreen
                                </Button>
                            );
                        }
                    })()}
                </FlexBox>
            </Wrapper>
        </>
    );
};

export default DescriptionHeader;
