/* eslint-disable @next/next/no-img-element */
// Tools
import { useState, useRef } from "react";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { DraggableImageContentField } from "@/@types/DestinationDescription";
// Material UI Components
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
// Other components
import { ImageControls, SelectImageButton } from "@/components/_utils/ImageControls";
import ImageModal from "@/components/_utils/ImageModal";

interface ImageBodyProps {
    data: DraggableImageContentField;
    updateSingleProp: (prop: keyof DraggableImageContentField, val: DraggableImageContentField[typeof prop]) => void;
}

const Image = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
});

const ImageBody: FunctionComponent<ImageBodyProps> = (props) => {
    const fileInput = useRef<HTMLInputElement | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const openFileSelectDialog = () => fileInput.current?.click();

    const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0];
        if (file) {
            props.updateSingleProp("src", file);

            const reader = new FileReader();
            reader.onload = (r) => {
                props.updateSingleProp("url", r.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box
            sx={{
                width: "100%", //
                height: "300px",
                position: "relative",
            }}
        >
            <input type="file" ref={fileInput} style={{ display: "none" }} accept="image/*" onChange={onFileInputChange} />

            {(() => {
                if (props.data.url) {
                    return (
                        <>
                            <ImageModal open={{ value: openModal, setValue: setOpenModal }} imageURL={props.data.url}></ImageModal>
                            <Image
                                src={props.data.url} //
                                alt="image"
                            ></Image>
                        </>
                    );
                } else {
                    return (
                        <>
                            <Skeleton animation="wave" variant="rectangular" sx={{ height: "100%" }}></Skeleton>
                            <SelectImageButton onClick={openFileSelectDialog}></SelectImageButton>
                        </>
                    );
                }
            })()}

            <ImageControls
                openModal={() => setOpenModal(true)} //
                openFileSelectDialog={openFileSelectDialog}
                image={props.data.src}
            ></ImageControls>
        </Box>
    );
};

export default ImageBody;
