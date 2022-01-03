import stated from "@/utils/client/stated";
import { useState, useEffect } from "react";
import { ValidationError } from "@/utils/api/Errors";
import { validateDescription } from "@/validators/createDestinationValidator";
// Types
import type { StatedDataField } from "@/@types/StagedDataField";
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/DestinationDescription";
import type { DraggableDestinationContentField } from "@/@types/DestinationDescription";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Other Components
import DescriptionHeader from "@/components/admin/create_destination/description/DescriptionHeader";
import ContentFieldsWrapper from "@/components/admin/create_destination/description/fields_wrapper/ContentFieldsWrapper";
import SectionHeader from "@/components/admin/create_destination/SectionHeader";
import BottomNavigation from "@/components/admin/create_destination/BottomNavigation";
import SingleContentField from "@/components/admin/create_destination/description/single_content_field/SingleContentField";
import SectionIsEmpty from "@/components/admin/create_destination/_utils/SectionIsEmpty";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";
// Material UI Icons
import Newspaper from "@mui/icons-material/Newspaper";

interface DescriptionInterface {
    description: StatedDataField<DraggableDestinationContentField[]>;
    // Auxiliary
    buttonStyles: Record<string, unknown>;
    stepperIndex: StatedDataField<number>;
}

const Description: FunctionComponent<DescriptionInterface> = (props) => {
    const [_scrollableKey, _setScrollableKey] = useState<number>(0); // For computing `useLayoutEffect` in `ContentFieldsWrapper` component

    const [blockContinue, setBlockContinue] = useState<boolean>(true);
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    const [newContentFieldType, setNewContentFieldType] = useState<FieldType>(FieldType.HEADER);
    const blockDeleting = props.description.value.length < 3;
    const updateData = (
        indexToModify: number, //
        valueAfterModification: DraggableDestinationContentField | "REMOVE_THIS_ELEMENT" | "ADD_ELEMENT",
        newFieldType?: FieldType
    ) => {
        if (valueAfterModification === "ADD_ELEMENT") {
            // Scroll to the bottom of container
            const wrapper = document.getElementById("content-fields-wrapper");
            if (wrapper) setTimeout(() => wrapper.scroll({ top: wrapper.scrollHeight, behavior: "smooth" }), 10);
            //
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
        } else {
            props.description.setValue(
                props.description.value.map((value: DraggableDestinationContentField, index: number) => {
                    if (indexToModify === index) return valueAfterModification;
                    else return value;
                })
            );
        }
    };
    //
    // Validation
    //
    useEffect(() => {
        setBlockContinue(!validateDescription(props.description.value));
    }, [props.description.value]);

    return (
        <Fade in={true}>
            <Box className={styles["section-content-wrapper"]} component="section" sx={{ color: "text.primary" }}>
                <SectionHeader text="Description"></SectionHeader>

                <DescriptionHeader
                    data={props.description.value}
                    addNewContentField={() => updateData(0, "ADD_ELEMENT", newContentFieldType)}
                    newContentFieldType={stated<FieldType>(newContentFieldType, setNewContentFieldType)}
                    setFullscreen={setFullscreen}
                ></DescriptionHeader>

                <ContentFieldsWrapper
                    description={props.description} //
                    _scrollableKey={_scrollableKey}
                    fullscreen={stated(fullscreen, setFullscreen)}
                    // For fullscreen header
                    addNewContentField={() => updateData(0, "ADD_ELEMENT", newContentFieldType)}
                    newContentFieldType={stated<FieldType>(newContentFieldType, setNewContentFieldType)}
                    setFullscreen={setFullscreen}
                >
                    {(() => {
                        if (props.description.value.length) {
                            return props.description.value.map((field: DraggableDestinationContentField, index: number) => {
                                return (
                                    <SingleContentField
                                        key={`${field.id}-${field.type}`} //
                                        index={index}
                                        blockDeleting={blockDeleting}
                                        data={field}
                                        fullscreen={fullscreen}
                                        _setScrollableKey={_setScrollableKey}
                                        updateData={(value: DraggableDestinationContentField | "REMOVE_THIS_ELEMENT") => updateData(index, value)}
                                    ></SingleContentField>
                                );
                            });
                        } else {
                            return (
                                <SectionIsEmpty
                                    icon={<Newspaper></Newspaper>} //
                                    header="There are currently no content fields"
                                    onClick={() => updateData(0, "ADD_ELEMENT", newContentFieldType)}
                                    buttonMsg="Add a new field"
                                ></SectionIsEmpty>
                            );
                        }
                    })()}
                </ContentFieldsWrapper>

                <BottomNavigation
                    blockContinue={blockContinue} //
                    currentSlideIndex={props.stepperIndex.value}
                    updateSlideIndex={props.stepperIndex.setValue}
                ></BottomNavigation>
            </Box>
        </Fade>
    );
};

export default Description;
