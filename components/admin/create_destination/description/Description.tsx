import { useState } from "react";
// Types
import type { StatedDataField } from "@/@types/StagedDataField";
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/DestinationDescription";
import type { DraggableDestinationContentField } from "@/@types/DestinationDescription";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// Other Components
import SectionHeader from "@/components/admin/create_destination/SectionHeader";
import BottomNavigation from "@/components/admin/create_destination/BottomNavigation";
import SingleContentField from "@/components/admin/create_destination/description/single_content_field/SingleContentField";
import ContentFieldsWrapper from "@/components/admin/create_destination/description/ContentFieldsWrapper";
import SelectFromEnum from "@/components/_utils/SelectFromEnum";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";
import stated from "@/utils/client/stated";

interface DescriptionInterface {
    description: StatedDataField<DraggableDestinationContentField[]>;
    // Auxiliary
    buttonStyles: Record<string, unknown>;
    stepperIndex: StatedDataField<number>;
}

const Description: FunctionComponent<DescriptionInterface> = (props) => {
    const [newContentField, setNewContentField] = useState<FieldType>(FieldType.HEADER);
    const updateData = (
        indexToModify: number, //
        valueAfterModification: DraggableDestinationContentField | "REMOVE_THIS_ELEMENT" | "ADD_ELEMENT",
        newFieldType?: FieldType
    ) => {
        if (valueAfterModification === "ADD_ELEMENT") {
            const add = (data: DraggableDestinationContentField) => props.description.setValue([...props.description.value, data]);
            switch (newFieldType) {
                case FieldType.HEADER:
                    return add({ type: FieldType.HEADER, header: "", id: String(Date.now()) });
                case FieldType.PARAGRAPH:
                    return add({ type: FieldType.PARAGRAPH, content: "", id: String(Date.now()) });
                case FieldType.IMAGE:
                    return add({ type: FieldType.IMAGE, src: null, url: null, id: String(Date.now()) });
            }
        } else if (valueAfterModification === "REMOVE_THIS_ELEMENT") {
            props.description.setValue(props.description.value.filter((_, index: number) => index !== indexToModify));
        }
    };

    return (
        <Fade in={true}>
            <Box className={styles["section-content-wrapper"]} component="section" sx={{ color: "text.primary" }}>
                <SectionHeader text="Description"></SectionHeader>

                <Button
                    variant="outlined" //
                    onClick={() => updateData(0, "ADD_ELEMENT", newContentField)}
                >
                    Add
                </Button>
                <SelectFromEnum
                    enum={FieldType} //
                    value={stated<FieldType>(newContentField, setNewContentField)}
                ></SelectFromEnum>

                <FormControlLabel
                    control={
                        <Switch
                        // onChange={(e) => props.setPreviewMode(e.target.checked)} //
                        />
                    }
                    label="Preview mode"
                    sx={{
                        pr: 2,
                        m: 0,
                        borderRadius: "5px",
                    }}
                ></FormControlLabel>

                <ContentFieldsWrapper description={props.description}>
                    {props.description.value.map((field: DraggableDestinationContentField, index: number) => {
                        return (
                            <SingleContentField
                                key={field.id} //
                                index={index}
                                contentLength={props.description.value.length}
                                data={field}
                                updateData={(value: DraggableDestinationContentField | "REMOVE_THIS_ELEMENT") => updateData(index, value)}
                            ></SingleContentField>
                        );
                    })}
                </ContentFieldsWrapper>

                <BottomNavigation
                    blockContinue={false} //
                    currentSlideIndex={props.stepperIndex.value}
                    updateSlideIndex={props.stepperIndex.setValue}
                ></BottomNavigation>
            </Box>
        </Fade>
    );
};

export default Description;
