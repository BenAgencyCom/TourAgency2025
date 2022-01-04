// Tools
import { useState } from "react";
import { styled } from "@mui/system";
import stated from "@/utils/client/stated";
import restrictions from "@/utils/restrictions/createDestination";
// Types
import { FieldType } from "@/@types/DestinationDescription";
import type { FunctionComponent } from "react";
import type { SplittedSubfieldField, ParagraphContentField, ImageContentField } from "@/@types/DestinationDescription";
// Material UI Icons
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
// Other components
import ParagraphBody from "./Paragraph";
import ImageBody from "./Image";
import ChangeTypeDialog from "@/components/admin/create_destination/description/single_content_field/ChangeTypeDialog";
// Material UI Icons
import Settings from "@mui/icons-material/Settings";

const SplittedSubfieldHeader = styled(Box)({
    display: "flex", //
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "16px",
});

interface SplittedSubfiledProps {
    data: SplittedSubfieldField;
    fullscreen: boolean;
    updateSubField: (data: SplittedSubfieldField) => void;
}

const SplittedSubfiled: FunctionComponent<SplittedSubfiledProps> = (props) => {
    const [openChangeTypeDialog, setOpenChangeTypeDialog] = useState<boolean>(false);

    const updateSinglePropOfSubfield = <T extends SplittedSubfieldField>(prop: keyof T, val: T[typeof prop]) => {
        const newData = Object.assign({}, props.data) as T;
        newData[prop] = val;
        props.updateSubField(newData);
    };

    const updateType = (newType: FieldType) => {
        setOpenChangeTypeDialog(false);
        if (newType === FieldType.PARAGRAPH) {
            props.updateSubField({
                type: newType,
                content: "",
            });
        } else if (newType === FieldType.IMAGE) {
            props.updateSubField({
                type: newType,
                src: null,
                url: null,
            });
        }
    };

    return (
        <>
            {/* DIALOGS */}
            <ChangeTypeDialog
                openDialog={stated<boolean>(openChangeTypeDialog, setOpenChangeTypeDialog)} //
                updateType={updateType}
                excludeFromTypes={[FieldType.HEADER, FieldType.SPLITTED]}
                currentType={props.data.type}
            ></ChangeTypeDialog>

            {/* ACTUAL CONTENT */}
            <Box sx={{ width: "49%" }}>
                <SplittedSubfieldHeader component="header">
                    <Typography variant="body1"> {FieldType[props.data.type]}</Typography>
                    <Tooltip title="Change type" placement="top">
                        <Button variant="outlined" onClick={() => setOpenChangeTypeDialog(true)}>
                            <Settings></Settings>
                        </Button>
                    </Tooltip>
                </SplittedSubfieldHeader>
                {(() => {
                    switch (props.data.type) {
                        case FieldType.PARAGRAPH:
                            return (
                                <ParagraphBody
                                    split
                                    data={props.data as ParagraphContentField}
                                    fullscreen={props.fullscreen}
                                    updateSingleProp={(prop: keyof ParagraphContentField, val: ParagraphContentField[typeof prop]) => {
                                        return updateSinglePropOfSubfield<ParagraphContentField>(prop, val);
                                    }}
                                    restrictions={restrictions.description.paragraph}
                                ></ParagraphBody>
                            );
                        case FieldType.IMAGE:
                            return (
                                <ImageBody
                                    data={props.data as ImageContentField}
                                    fullscreen={props.fullscreen}
                                    updateSingleProp={(prop: keyof ImageContentField, val: ImageContentField[typeof prop]) => {
                                        return updateSinglePropOfSubfield<ImageContentField>(prop, val);
                                    }}
                                ></ImageBody>
                            );
                    }
                })()}
            </Box>
        </>
    );
};

export default SplittedSubfiled;
