// Tools
import { useState } from "react";
import stated from "@/utils/client/stated";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
// Other components
import Image from "next/Image";
import { ImageControls } from "@/components/_utils/ImageControls";
import ImageModal from "@/components/_utils/ImageModal";
// Styles
import styles from "@/sass/destinations/single_destination.module.sass";

interface ImageFieldProps {
    imageURL: string;
}

const ImageField: FunctionComponent<ImageFieldProps> = (props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleOpenModal = () => setOpenModal(true);

    return (
        <Box className={styles["content-image-wrapper"]} sx={{ mb: 2 }}>
            {(() => {
                if (props.imageURL) {
                    return (
                        <>
                            <Image
                                src={props.imageURL} //
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                                alt="image"
                            ></Image>
                            <ImageControls openModal={handleOpenModal}></ImageControls>
                        </>
                    );
                } else {
                    return <Skeleton animation="wave" variant="rectangular" sx={{ height: "100%" }}></Skeleton>;
                }
            })()}

            <ImageModal
                open={stated<boolean>(openModal, setOpenModal)} //
                imageURL={props.imageURL}
            ></ImageModal>
        </Box>
    );
};

export default ImageField;
