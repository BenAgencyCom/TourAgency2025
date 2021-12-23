import { useState, useEffect, useRef } from "react";
import { alpha } from "@mui/system";
// Types
import type { StatedDataField } from "@/@types/StagedDataField";
import type { FunctionComponent, ChangeEvent } from "react";
// Other Components
import SectionHeader from "@/components/admin/create_destination/SectionHeader";
import BottomNavigation from "@/components/admin/create_destination/BottomNavigation";
import Image from "next/Image";
import ImageModal from "@/components/_utils/ImageModal";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
// Material UI Icons
import Settings from "@mui/icons-material/Settings";
import ZoomIn from "@mui/icons-material/ZoomIn";
import Delete from "@mui/icons-material/Delete";
import Photo from "@mui/icons-material/Photo";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";

interface ThumbnailInterface {
    thumbnail: StatedDataField<File | null>;
    // Auxiliary
    buttonStyles: Record<string, unknown>;
    stepperIndex: StatedDataField<number>;
}

const Thumbnail: FunctionComponent<ThumbnailInterface> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const fileInp = useRef<HTMLInputElement | null>(null);

    const [imageURL, setImageUrl] = useState<string | null>(null);

    const loadImageURL = (file: File) => {
        const reader = new FileReader();
        reader.onload = (r) => {
            setImageUrl(r.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    if (props.thumbnail.value) {
        loadImageURL(props.thumbnail.value);
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0];
        if (file) {
            props.thumbnail.setValue(file);
            loadImageURL(file);
        }
    };

    const reset = () => {
        setImageUrl(null);
        props.thumbnail.setValue(null);
    };

    return (
        <Fade in={true}>
            <Box className={styles["section-content-wrapper"]} component="section">
                {(() => {
                    if (imageURL !== null) {
                        return (
                            <ImageModal
                                open={{ value: open, setValue: setOpen }}
                                imageURL={imageURL as string} //
                            ></ImageModal>
                        );
                    }
                })()}

                <SectionHeader text="Thumbnail"></SectionHeader>
                <Box sx={{ width: "100%", flexGrow: 1, bgcolor: "action.disabledBackground", position: "relative" }}>
                    <input type="file" ref={fileInp} style={{ display: "none" }} accept="image/*" onChange={onInputChange} />

                    {(() => {
                        if (props.thumbnail.value) {
                            if (imageURL) {
                                return <Image src={imageURL} alt="thumbnail" layout="fill" objectFit="cover" objectPosition="center"></Image>;
                            }
                            return <Skeleton animation="wave" sx={{ width: "100%", height: "100%" }} variant="rectangular"></Skeleton>;
                        } else {
                            return (
                                <>
                                    <Skeleton animation="wave" sx={{ width: "100%", height: "100%" }} variant="rectangular"></Skeleton>
                                    <Typography
                                        sx={{
                                            position: "absolute", //
                                            color: "text.primary",
                                            top: "50%",
                                            left: "0",
                                            width: "100%",
                                            transform: "translateY(-50%)",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: "100%",
                                        }}
                                        component="span"
                                    >
                                        <Photo sx={{ fontSize: "5rem" }}></Photo>
                                        <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
                                            Select a thumbnail photo for a new destination
                                        </Typography>
                                        <Button variant="contained" onClick={() => fileInp.current?.click()}>
                                            Browse
                                        </Button>
                                    </Typography>
                                </>
                            );
                        }
                    })()}

                    <ButtonGroup
                        sx={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            bgcolor: (theme) => alpha(theme.palette.background.default, 0.8),
                            backdropFilter: "blur(5px)",
                        }}
                        variant="contained"
                    >
                        <Tooltip title={props.thumbnail.value ? "Change" : "Select photo"} placement="top">
                            <IconButton onClick={() => fileInp.current?.click()}>
                                <Settings></Settings>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Reset" placement="top">
                            <span>
                                <IconButton onClick={reset} disabled={!imageURL}>
                                    <Delete></Delete>
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip title="Preview" placement="top">
                            <span>
                                <IconButton onClick={() => setOpen(imageURL !== null ? true : false)} disabled={!imageURL}>
                                    <ZoomIn></ZoomIn>
                                </IconButton>
                            </span>
                        </Tooltip>
                    </ButtonGroup>
                </Box>
                <BottomNavigation
                    blockContinue={!props.thumbnail.value} //
                    currentSlideIndex={props.stepperIndex.value}
                    updateSlideIndex={props.stepperIndex.setValue}
                ></BottomNavigation>
            </Box>
        </Fade>
    );
};

export default Thumbnail;
