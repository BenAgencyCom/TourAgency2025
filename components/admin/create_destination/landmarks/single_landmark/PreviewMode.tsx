import { useState } from "react";
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
import ControlIcons from "@/components/admin/create_destination/landmarks/single_landmark/_ControlIcons";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";

interface PreviewModeProps {
    data: Landmark;
    tabIndex: number;
}

const PreviewMode: FunctionComponent<PreviewModeProps> = (props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <Fade in={true}>
            <Box className={styles["single-destination"]} sx={{ pb: 2 }}>
                <Typography variant="h4" sx={{ textAlign: "left", width: "100%", px: 2 }}>
                    {props.data.title}
                </Typography>

                <Box sx={{ px: 2 }}>
                    <Chip label={props.data.type} sx={{ mt: 1, fontWeight: "bold", mx: "3px" }} color="primary"></Chip>
                    {props.data.tags.map((tag, index) => {
                        return <Chip key={index} label={tag} sx={{ mt: 1, fontWeight: "bold", mx: "3px" }}></Chip>;
                    })}
                </Box>

                <Box sx={{ width: "100%", flexGrow: 1, my: 2, position: "relative" }}>
                    {(() => {
                        if (props.data.pictureURL) {
                            return (
                                <>
                                    <ImageModal open={{ value: openModal, setValue: setOpenModal }} imageURL={props.data.pictureURL}></ImageModal>

                                    <ControlIcons
                                        picture={props.data.picture} //
                                        tabIndex={props.tabIndex}
                                        openModal={() => setOpenModal(true)}
                                    ></ControlIcons>

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

                <Typography
                    variant="body1"
                    sx={{
                        height: "35%", //
                        textIndent: "10px",
                        paddingRight: "10px",
                        overflowY: "scroll",
                        mx: 2,
                        "&::-webkit-scrollbar": { width: "10px" },
                        "&::-webkit-scrollbar-track": { boxShadow: "inset 0 0 2px rgba(0,0,0,0.5)" },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: (theme) => theme.palette.primary.main,
                            borderRadius: "2px",
                        },
                    }}
                >
                    {props.data.description}
                </Typography>
            </Box>
        </Fade>
    );
};

export default PreviewMode;
