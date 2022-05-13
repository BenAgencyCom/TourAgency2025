import { useState, useRef, useMemo, useCallback } from "react";
import SingleLandmarkJoiSchema from "@/validators/helpers/create_destination/singleLandmarkJoiSchema";
import stated from "@/utils/client/stated";
// Types
import type { FunctionComponent } from "react";
import type { Landmark } from "@/@types/pages/admin/create_destination/Landmark";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Other Components
import SectionHeader from "@/components/admin/create_destination/_utils/layout/SectionHeader";
import BottomNavigation from "@/components/admin/create_destination/_utils/layout/BottomNavigation";
import SingleLandmark from "./single_landmark/SingleLandmark";
import LandmarksWrapper from "@/components/admin/create_destination/landmarks/Wrapper";
import Hiddable from "@/components/_utils/Hiddable";
import LandmarksNavigation from "@/components/admin/create_destination/landmarks/LandmarksNavigation";
import CreateNewLandmarkDialog from "@/components/admin/create_destination/landmarks/CreateNewLandmarkDialog";
import Slider from "react-slick";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";

interface LandmarksInterface {
    stepperIndex: StatedDataField<number>;
}
const Landmarks: FunctionComponent<LandmarksInterface> = (props) => {
    const landmarks = useAppSelector((state) => state.landmarks.list);

    const swapper = useRef<Slider | null>(null);
    const [hideNavigation, setHideNavigation] = useState<boolean>(false);
    const [currentSlideIndex, _setCurrentSlideIndex] = useState<number>(0); // DO NOT USE `_setCurrentSlideIndex` DIRECTLY!
    const [openCreateLandmarkDialog, setOpenCreateLandmarkDialog] = useState<boolean>(false);
    //
    const selectSlide = (index: number) => {
        _setCurrentSlideIndex(index);
        swapper.current?.slickGoTo(index);
    };
    //
    // Validation
    //
    const validateSingleLandmark = useCallback(
        () =>
            (landmark: Landmark): boolean => {
                const { title, description, picture, type, tags } = landmark;
                if (picture === null) return false;
                const { error } = SingleLandmarkJoiSchema.validate({ title, description, type, tags });
                return !Boolean(error);
            },
        []
    );

    const validationResults = useMemo<boolean[]>(() => {
        return landmarks.map((landmark) => validateSingleLandmark()(landmark.data));
    }, [landmarks, validateSingleLandmark]);
    //
    // Update the array of landmarks
    //
    return (
        <Fade in={true}>
            <Box className={styles["section-content-wrapper"]} component="section">
                <CreateNewLandmarkDialog
                    openDialog={stated(openCreateLandmarkDialog, setOpenCreateLandmarkDialog)} //
                    goToTheLatestSlide={() => selectSlide(landmarks.length)}
                ></CreateNewLandmarkDialog>

                <Hiddable hide={hideNavigation} height={120}>
                    <SectionHeader text="Landmarks"></SectionHeader>
                </Hiddable>

                {(() => {
                    if (landmarks.length) {
                        return (
                            <LandmarksNavigation
                                currentSlideIndex={currentSlideIndex} //
                                hideNavigation={hideNavigation}
                                selectSlide={selectSlide}
                                validationResults={validationResults}
                                openCreateLandmarkDialog={() => setOpenCreateLandmarkDialog(true)}
                            ></LandmarksNavigation>
                        );
                    }
                })()}

                <LandmarksWrapper
                    hideNavigation={hideNavigation} //
                    swapper={swapper}
                    thereAreNoLandmarks={landmarks.length === 0}
                    openCreateLandmarkDialog={() => setOpenCreateLandmarkDialog(true)}
                >
                    {landmarks.map((landmark, index: number) => {
                        return (
                            <SingleLandmark
                                key={index} //
                                index={index}
                                currentSlideIndex={currentSlideIndex}
                                isValid={validationResults[index]}
                                landmark={landmark}
                                hideNavigation={{ value: hideNavigation, setValue: setHideNavigation }}
                                goToPreviousSlide={() => selectSlide(currentSlideIndex - 1)}
                            ></SingleLandmark>
                        );
                    })}
                </LandmarksWrapper>
                <Hiddable hide={hideNavigation} height={80}>
                    <BottomNavigation
                        blockContinue={validationResults.findIndex((el) => el === false) !== -1} //
                        currentSlideIndex={props.stepperIndex.value}
                        updateSlideIndex={props.stepperIndex.setValue}
                    ></BottomNavigation>
                </Hiddable>
            </Box>
        </Fade>
    );
};

export default Landmarks;
