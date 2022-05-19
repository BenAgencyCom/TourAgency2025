// Tools
import { useState } from "react";
import { styled } from "@mui/system";
import stated from "@/utils/client/stated";
import restrictions from "@/utils/restrictions/createDestination_OLD";
// Types
import { FieldType } from "@/@types/Description";
import type { FunctionComponent } from "react";
import type { SplittedSubfieldField, ParagraphContentField, ImageContentField } from "@/@types/Description";
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
// Redux
import { helpers } from "@/redux/slices/create_destination/description";

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

    const updateImage = (data: { src: File; url: string }) => {
        if (props.data.type === FieldType.IMAGE) {
            props.updateSubField({
                type: FieldType.IMAGE,
                ...data,
            });
        }
    };

    const updateSinglePropOfSubfield = <T extends SplittedSubfieldField>(prop: keyof T, val: T[typeof prop]) => {
        const newData = Object.assign({}, props.data) as T;
        newData[prop] = val;
        if (props.data.type === FieldType.IMAGE && prop !== "src") {
            (newData as ImageContentField).src = props.data.src;
        }
        props.updateSubField(newData);
    };

    const updateType = (newType: FieldType.PARAGRAPH | FieldType.IMAGE) => {
        setOpenChangeTypeDialog(false);
        props.updateSubField(helpers.createContentField(newType) as SplittedSubfieldField);
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
                                    content={props.data.content}
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
                                    url={props.data.url as string}
                                    fullscreen={props.fullscreen}
                                    splittedFieldUpdate={updateImage}
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
