import stated from "@/utils/client/stated";
import { useState, useEffect } from "react";
import { validateDescription } from "@/validators/helpers/create_destination/descriptionValidators";
// Types
import type { StatedDataField } from "@/@types/StatedDataField";
import type { FunctionComponent } from "react";
import { helpers } from "@/redux/slices/create_destination/description";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Other Components
import DescriptionHeader from "@/components/admin/create_destination/description/DescriptionHeader";
import ContentFieldsWrapper from "@/components/admin/create_destination/description/fields_wrapper/ContentFieldsWrapper";
import SectionHeader from "@/components/admin/create_destination/_utils/layout/SectionHeader";
import BottomNavigation from "@/components/admin/create_destination/_utils/layout/BottomNavigation";
import SingleContentField from "@/components/admin/create_destination/description/single_content_field/SingleContentField";
import SectionIsEmpty from "@/components/admin/create_destination/_utils/SectionIsEmpty";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";
// Material UI Icons
import Newspaper from "@mui/icons-material/Newspaper";
// Redux
import { useAppSelector } from "@/hooks/useRedux";

interface DescriptionInterface {
    stepperIndex: StatedDataField<number>;
}

const Description: FunctionComponent<DescriptionInterface> = (props) => {
    const description = useAppSelector((state) => state.description.list);
    const [_scrollableKey, _setScrollableKey] = useState<number>(0); // For computing `useLayoutEffect` in `ContentFieldsWrapper` component
    // Dialogs
    const [previewOpenDialog, setPreviewOpenDialog] = useState<boolean>(false);
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    //
    const [blockContinue, setBlockContinue] = useState<boolean>(true);
    const blockDeleting = description.length < 3;
    //
    // Validation
    //
    useEffect(() => {
        setBlockContinue(!validateDescription(description.map((target) => target.data)));
    }, [description]);

    return (
        <Fade in={true}>
            <Box className={styles["section-content-wrapper"]} component="section" sx={{ color: "text.primary" }}>
                <SectionHeader text="Description"></SectionHeader>

                {(() => {
                    if (!fullscreen) {
                        return (
                            <DescriptionHeader
                                previewDialog={stated<boolean>(previewOpenDialog, setPreviewOpenDialog)} //
                                setFullscreen={setFullscreen}
                            ></DescriptionHeader>
                        );
                    }
                })()}

                {(() => {
                    if (!previewOpenDialog) {
                        return (
                            <>
                                <ContentFieldsWrapper
                                    description={description} //
                                    _scrollableKey={_scrollableKey}
                                    fullscreen={stated(fullscreen, setFullscreen)}
                                >
                                    {(() => {
                                        if (description.length) {
                                            return description.map((field, index: number) => {
                                                return (
                                                    <SingleContentField
                                                        key={`${field.id}-${field.data.type}`} //
                                                        index={index}
                                                        blockDeleting={blockDeleting}
                                                        field={field}
                                                        fullscreen={fullscreen}
                                                        _setScrollableKey={_setScrollableKey}
                                                    ></SingleContentField>
                                                );
                                            });
                                        } else {
                                            return (
                                                <SectionIsEmpty
                                                    icon={<Newspaper></Newspaper>} //
                                                    header="There are currently no content fields"
                                                    onClick={() => helpers.addItemWithAutomaticType()}
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
                            </>
                        );
                    }
                })()}
            </Box>
        </Fade>
    );
};

export default Description;
