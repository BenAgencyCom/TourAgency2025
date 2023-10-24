// Tools
import { useState } from "react";
import dynamic from "next/dynamic";
import stated from "@/utils/client/stated";
import useCarousel from "./hooks/useCarousel";
import useFullscreen from "./hooks/useFullscreen";
import formatImageURL from "./utils/formatImageURL";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
// Other Components
import Image from "next/image";
import TopSideButtons from "./TopSideButtons";
import Loading from "@/components/_utils/Loading";
const NavigationBetweenImages = dynamic(() => import("./NavigationBetweenImages"));
// Styled components
import ImageModelWrapper from "./styled_components/ImageModelWrapper";

interface ImageModalProps {
    open: StatedDataField<boolean>;
    imageURL: string;
    modalMaxResolution?: string;
    advanceModalProperties?: {
        title: string;
        sectionName: string;
    };
}

const ImageModal: FunctionComponent<ImageModalProps> = (props) => {
    // Utils
    const urlInHighestResolution: string = formatImageURL({
        modalMaxResolution: props.modalMaxResolution,
        url: props.imageURL,
    });
    // Hooks
    const [imageIndex, setImageIndex] = useState<number>(0);
    const { currentImageTitle, currentImageURL, currentSectionName, imagesInTotal } = useCarousel({
        imageIndex: stated(imageIndex, setImageIndex),
        urlInHighestResolution,
        advanceModalProperties: props.advanceModalProperties,
        modalMaxResolution: props.modalMaxResolution,
    });
    const { isFullscreenOpened, handleFullsizeToggle } = useFullscreen();
    //
    const closeModal = () => {
        if (isFullscreenOpened) {
            handleFullsizeToggle();
            setTimeout(() => {
                props.open.setValue(false);
            }, 30);
        } else {
            props.open.setValue(false);
        }
    };

    return (
        <Modal
            open={props.open.value}
            onClose={closeModal}
            sx={{
                ".MuiBackdrop-root": {
                    backdropFilter: "blur(3px)",
                },
            }}
        >
            <Fade in={props.open.value}>
                <ImageModelWrapper>
                    <Loading></Loading>

                    {(() => {
                        if (props.advanceModalProperties) {
                            return (
                                <h4>
                                    <strong>{currentSectionName}</strong>
                                    <span className="seperator">/</span>
                                    {currentImageTitle}
                                </h4>
                            );
                        }
                    })()}
                    <TopSideButtons
                        handleCloseModal={closeModal} //
                        handleFullsizeToggle={handleFullsizeToggle}
                        fullscreenIsOpen={isFullscreenOpened}
                    />

                    <div className="imageWrapper">
                        <Image
                            src={props.advanceModalProperties ? currentImageURL : urlInHighestResolution} //
                            layout="fill"
                            alt="thumbnail"
                            objectFit="contain"
                            onClick={closeModal}
                            key={imageIndex}
                        ></Image>
                    </div>

                    {props.advanceModalProperties && (
                        <NavigationBetweenImages
                            imageIndex={stated(imageIndex, setImageIndex)} //
                            imagesInTotal={imagesInTotal}
                        />
                    )}
                </ImageModelWrapper>
            </Fade>
        </Modal>
    );
};

export default ImageModal;
