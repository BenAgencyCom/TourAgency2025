// Tools
import { styled } from "@mui/system";
import { useState } from "react";
import stated from "@/utils/client/stated";
// Types
import type { FunctionComponent, ReactNode } from "react";
import { FieldType } from "@/@types/DestinationDescription";
import type { StatedDataField } from "@/@types/StagedDataField";
import type { DestinationContentField } from "@/@types/DestinationDescription";
// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// Other components
import SelectFromEnum from "@/components/_utils/SelectFromEnum";
import DescriptionPreview from "@/components/admin/create_destination/description/DescriptionPreview";

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
    previewDialog?: StatedDataField<boolean>;
    data: DestinationContentField[];
    addNewContentField: () => void;
    setFullscreen: StatedDataField<boolean>["setValue"] | false;
    children?: ReactNode;
}

const DescriptionHeader: FunctionComponent<DescriptionHeaderProps> = (props) => {
    return (
        <>
            {/* Dialogs: */}

            {(() => {
                if (props.previewDialog !== undefined) {
                    return (
                        <DescriptionPreview
                            open={props.previewDialog} //
                            data={props.data}
                        ></DescriptionPreview>
                    );
                }
            })()}

            {/* Actual Header */}

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
                    {(() => {
                        if (props.previewDialog !== undefined) {
                            return (
                                <Button variant="outlined" onClick={() => props.previewDialog?.setValue(true)} sx={{ mr: 1 }}>
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
                                <Button variant="outlined" onClick={() => props.setFullscreen !== false && props.setFullscreen(true)}>
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
