// Tools
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
// Material UI Icons
import Close from "@mui/icons-material/Close";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
// Other Components
import Image from "next/Image";
import Loading from "@/components/_utils/Loading";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Wrapper = styled("div")(({ theme }) => ({
    position: "relative",
    top: "50%",
    left: "50vw",
    transform: "translate(-50%, -50%)",
    maxWidth: "1920px",
    width: "calc(100vw - 100px)",
    height: "calc(100vh - 60px)",
    display: "flex",
    flexDirection: "column",
    "div.imageWrapper": {
        position: "relative",
        flexGrow: "1",
    },
    h4: {
        margin: "0",
        color: "#fff",
        fontSize: "1.5rem",
        userSelect: "none",
        fontWeight: "300",
        marginBottom: "10px",
        strong: {
            color: theme.palette.primary.main,
            fontWeight: 900,
        },
        "span.seperator": {
            margin: "0 10px",
        },
    },
    "div.navigation": {
        padding: "5px",
        position: "absolute", //
        transform: "translateX(-50%)",
        left: "50%",
        bottom: "0",
        button: {
            color: theme.palette.text.primary,
            "&:disabled": {
                opacity: 0.5,
            },
        },
        borderRadius: "5px",
        strong: {
            fontSize: "1.4rem",
            margin: "0 30px",
            width: "60px",
            userSelect: "none",
            fontWeigt: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: theme.palette.background.default,
    },
    button: {
        fontSize: "1.1rem",
    },
    "button.close": {
        position: "absolute",
        zIndex: "2",
        top: "10px",
        right: "0",
        color: "#fff",
    },
    ["@media (max-width:1200px)"]: {
        height: "calc(100vh - 200px)",
    },
    ["@media (max-width:1000px)"]: {
        width: "calc(100vw - 40px)",
        height: "100vh",
        paddingTop: "100px",
        h4: {
            margin: "0",
            padding: "0",
            height: "200px",
        },
        "div.imageWrapper": {
            maxHeight: "500px",
        },
        "div.navigation": {
            bottom: "50px",
        },
    },
    ["@media (max-width:700px)"]: {
        "div.imageWrapper": {
            maxHeight: "400px",
        },
    },
    ["@media (max-width:500px)"]: {
        width: "calc(100vw - 20px)",
        paddingTop: "70px",
        h4: {
            display: "flex",
            flexDirection: "column",
            "span.seperator": {
                display: "none",
            },
        },
        "div.imageWrapper": {
            maxHeight: "35vh",
        },
        "div.navigation": {
            bottom: "20px",
            strong: {
                fontSize: "1.5rem",
            },
        },
    },
}));

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
    const [imageIndex, setImageIndex] = useState<number>(0);
    // globalThis properties' names
    const MODAL_IMAGES_KEY = "modal-images";
    const MODAL_TITLES_KEY = "modal-titles";
    const MODAL_SECTION_NAMES_KEY = "modal-section-names";
    const MODAL_PATHNAME_KEY = "modal-pathname";

    const [allSectionNames, setAllSectionNames] = useState<string[]>([]);
    const [allImagesForModal, setAllImagesForModal] = useState<string[]>([]);
    const [allTitlesForModal, setAllTitlesForModal] = useState<string[]>([]);

    const closeModal = () => props.open.setValue(false);

    const urlInHighestResolution: string = (() => {
        if (props.imageURL.slice(0, 10) === "data:image") return props.imageURL;
        const originalURLSplitted = props.imageURL.split("/");
        const imageExtension = props.imageURL.split(".")[1];
        originalURLSplitted[originalURLSplitted.length - 1] = `${props.modalMaxResolution}.${imageExtension}`;
        return originalURLSplitted.join("/");
    })();

    // Save information about this particular image in
    // globalThis object in order to allow users to visit all images without closing single modal
    if (props.advanceModalProperties && props.modalMaxResolution) {
        const { title, sectionName } = props.advanceModalProperties;
        const routerPathIsInvalid = !(globalThis as any)[MODAL_PATHNAME_KEY] || window.location.href !== (globalThis as any)[MODAL_PATHNAME_KEY];

        if (!(globalThis as any)[MODAL_IMAGES_KEY] || routerPathIsInvalid) {
            (globalThis as any)[MODAL_IMAGES_KEY] = [urlInHighestResolution];
            (globalThis as any)[MODAL_TITLES_KEY] = [title];
            (globalThis as any)[MODAL_SECTION_NAMES_KEY] = [sectionName];
            (globalThis as any)[MODAL_PATHNAME_KEY] = window.location.href;
        } else if (!(globalThis as any)[MODAL_IMAGES_KEY].includes(urlInHighestResolution)) {
            (globalThis as any)[MODAL_IMAGES_KEY].push(urlInHighestResolution);
            (globalThis as any)[MODAL_TITLES_KEY].push(title);
            (globalThis as any)[MODAL_SECTION_NAMES_KEY].push(sectionName);
        }
    }

    useEffect(() => {
        if (!props.advanceModalProperties) return;
        const images = (globalThis as any)[MODAL_IMAGES_KEY];
        setAllTitlesForModal((globalThis as any)[MODAL_TITLES_KEY]);
        setAllSectionNames((globalThis as any)[MODAL_SECTION_NAMES_KEY]);
        setAllImagesForModal(images);
        setImageIndex(images.indexOf(urlInHighestResolution));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [(globalThis as any)[MODAL_IMAGES_KEY], props.advanceModalProperties]);

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
                <Wrapper>
                    <Loading></Loading>

                    {(() => {
                        if (props.advanceModalProperties) {
                            return (
                                <h4>
                                    <strong>{allSectionNames[imageIndex]}</strong>
                                    <span className="seperator">/</span>
                                    {allTitlesForModal[imageIndex]}
                                </h4>
                            );
                        }
                    })()}

                    <Button onClick={closeModal} variant="contained" color="primary" className="close">
                        <Close></Close>
                    </Button>
                    <div className="imageWrapper">
                        <Image
                            src={props.advanceModalProperties ? allImagesForModal[imageIndex] : urlInHighestResolution} //
                            layout="fill"
                            alt="thumbnail"
                            objectFit="contain"
                            onClick={closeModal}
                            key={imageIndex}
                        ></Image>
                    </div>

                    {(() => {
                        if (props.advanceModalProperties) {
                            return (
                                <div className="navigation">
                                    <FlexBox>
                                        <Button onClick={() => setImageIndex((val) => val - 1)} disabled={imageIndex === 0}>
                                            <ArrowBackIos />
                                        </Button>

                                        <strong>
                                            {imageIndex + 1}/{allImagesForModal.length}
                                        </strong>
                                        <Button onClick={() => setImageIndex((val) => val + 1)} disabled={imageIndex === allImagesForModal.length - 1}>
                                            <ArrowForwardIos />
                                        </Button>
                                    </FlexBox>
                                </div>
                            );
                        }
                    })()}
                </Wrapper>
            </Fade>
        </Modal>
    );
};

export default ImageModal;
