// Tools
import { useState } from "react";
import { styled } from "@mui/system";
import stated from "@/utils/client/stated";
// Types
import type { ImageProps } from "next/image";
import type { FunctionComponent } from "react";
// Other components
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import ImageModal from "@/components/_utils/ImageModal";
import { ImageControls } from "@/components/_utils/ImageControls";
// Styled Components
const ImageWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: "100%",
}));
interface SkeletonImageProps extends Omit<ImageProps, "src"> {
    src: string;
    modalMaxResolution?: string;
    advanceModalProperties?: {
        title: string;
        sectionName: string;
    };
    openFileSelectDialog?: () => void;
}
const SkeletonImage: FunctionComponent<SkeletonImageProps> = (props) => {
    const { advanceModalProperties, modalMaxResolution, openFileSelectDialog, ...propsToForward } = props;

    const [imageIsStillLoading, setImageIsStillLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleOpenModal = () => !imageIsStillLoading && setOpenModal(true);

    return (
        <ImageWrapper>
            <Image
                alt={props.alt} //
                {...propsToForward}
                src={props.src}
                onLoadingComplete={() => setImageIsStillLoading(false)}
            ></Image>
            {(() => {
                if (imageIsStillLoading) return <Skeleton variant="rectangular" sx={{ width: "100%", height: "100%" }}></Skeleton>;
                else if (advanceModalProperties && modalMaxResolution) {
                    return (
                        <>
                            <ImageModal
                                open={stated<boolean>(openModal, setOpenModal)} //
                                imageURL={props.src as string}
                                modalMaxResolution={modalMaxResolution}
                                advanceModalProperties={props.advanceModalProperties}
                            ></ImageModal>

                            <ImageControls openModal={handleOpenModal} url={props.src as string} openFileSelectDialog={openFileSelectDialog}></ImageControls>
                        </>
                    );
                } else if (modalMaxResolution) {
                    return (
                        <>
                            <ImageModal
                                open={stated<boolean>(openModal, setOpenModal)} //
                                imageURL={props.src as string}
                                modalMaxResolution={modalMaxResolution}
                            ></ImageModal>

                            <ImageControls openModal={handleOpenModal} url={props.src as string} openFileSelectDialog={openFileSelectDialog}></ImageControls>
                        </>
                    );
                }
            })()}
        </ImageWrapper>
    );
};

export default SkeletonImage;
