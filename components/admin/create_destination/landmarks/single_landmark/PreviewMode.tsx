import { useState } from "react";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { Landmark } from "@/@types/Landmark";
// Material UI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
// Other Components
import Image from "next/Image";
import ImageModal from "@/components/_utils/ImageModal";
import { ImageControls } from "@/components/_utils/ImageControls";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";

const Tag = styled(Chip)(({ theme }) => ({
    fontWeight: "bold",
    margin: `${theme.spacing(1)} 3px 0 3px`,
}));

const LandmarkMainTitle = styled(Typography)(({ theme }) => ({
    textAlign: "left",
    width: "100%",
    padding: `0 ${theme.spacing(2)}`,
}));

const LandmarkDescription = styled(Typography)(({ theme }) => ({
    height: "35%",
    textIndent: "10px",
    paddingRight: "10px",
    overflowY: "scroll",
    mx: 2,
    "&::-webkit-scrollbar": { width: "10px" },
    "&::-webkit-scrollbar-track": { boxShadow: "inset 0 0 2px rgba(0,0,0,0.5)" },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "2px",
    },
}));

interface PreviewModeProps {
    data: Landmark;
    tabIndex: number;
}

const PreviewMode: FunctionComponent<PreviewModeProps> = (props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <Fade in={true}>
            <Box className={styles["single-destination"]} sx={{ pb: 2 }}>
                <LandmarkMainTitle variant="h4">{props.data.title}</LandmarkMainTitle>

                <Box sx={{ px: 2 }}>
                    <Tag label={props.data.type} color="primary"></Tag>

                    {props.data.tags.map((tag, index) => {
                        return <Tag key={index} label={tag}></Tag>;
                    })}
                </Box>

                <Box sx={{ width: "100%", flexGrow: 1, my: 2, position: "relative" }}>
                    {(() => {
                        if (props.data.pictureURL) {
                            return (
                                <>
                                    <ImageModal open={{ value: openModal, setValue: setOpenModal }} imageURL={props.data.pictureURL}></ImageModal>

                                    <ImageControls
                                        image={props.data.picture} //
                                        tabIndex={props.tabIndex}
                                        openModal={() => setOpenModal(true)}
                                    ></ImageControls>

                                    <Image
                                        src={props.data.pictureURL} //
                                        alt="picture"
                                        layout="fill"
                                        objectFit="cover"
                                        objectPosition="center"
                                    ></Image>
                                </>
                            );
                        } else {
                            return <Skeleton animation="wave" variant="rectangular" sx={{ width: "100%", height: "100%" }}></Skeleton>;
                        }
                    })()}
                </Box>

                <LandmarkDescription variant="body1">{props.data.description}</LandmarkDescription>
            </Box>
        </Fade>
    );
};

export default PreviewMode;
