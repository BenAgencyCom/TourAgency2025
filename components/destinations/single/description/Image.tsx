// Tools
import { styled, alpha } from "@mui/system";
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
// Styled Components
const ImageFieldWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    minHeight: "300px",
    "&::before": {
        content: "''",
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "95%",
        height: "103%",
        background: alpha(theme.palette.primary.main, 0.8),
        transform: `translate(-50%,-50%)`,
        transition: "opacity 1s .3s, transform 1s 1.3s",
        opacity: 0,
    },
}));

interface ImageFieldProps {
    imageURL: string;
    split?: true;
    extend?: boolean;
    side?: "left" | "right";
}

const ImageField: FunctionComponent<ImageFieldProps> = (props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleOpenModal = () => setOpenModal(true);

    const width: number = (() => {
        if (props.split) {
            return props.extend ? 59 : 49;
        }
        return 100;
    })();

    return (
        <ImageFieldWrapper
            sx={{
                width: `${width}% !important`, //
                height: `${props.split ? "auto" : "600px"}`,
                my: props.split ? 0 : 2,
            }}
            className={props.side === "right" ? "image-with-reversed-shape" : "image-with-shape"}
        >
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
                            <ImageControls openModal={handleOpenModal} url={props.imageURL}></ImageControls>
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
        </ImageFieldWrapper>
    );
};

export default ImageField;
