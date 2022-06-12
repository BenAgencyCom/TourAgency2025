/* eslint-disable @next/next/no-img-element */
// Tools
import { useState, useRef } from "react";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { ImageContentField } from "@/@types/Description";
// Material UI Components
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
// Other components
import { ImageControls, SelectImageButton } from "@/components/_utils/ImageControls";
import ImageModal from "@/components/_utils/ImageModal";

interface ImageBodyProps {
    fullscreen: boolean;
    url: string | null;
    updateSingleProp: (prop: keyof ImageContentField, val: ImageContentField[typeof prop]) => void;
    split?: true;
    splittedFieldUpdate?: (data: { src: File; url: string }) => void;
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
            const reader = new FileReader();
            reader.onload = (r) => {
                if (props.splittedFieldUpdate) {
                    props.splittedFieldUpdate({
                        src: file,
                        url: r.target?.result as string,
                    });
                } else {
                    props.updateSingleProp("src", file);
                    props.updateSingleProp("url", r.target?.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box
            sx={{
                width: "100%", //
                height: `${props.fullscreen ? (props.split ? 400 : 500) : 280}px`,
                position: "relative",
            }}
        >
            <input type="file" ref={fileInput} style={{ display: "none" }} accept="image/*" onChange={onFileInputChange} />

            {(() => {
                if (props.url) {
                    return (
                        <>
                            <ImageModal open={{ value: openModal, setValue: setOpenModal }} imageURL={props.url}></ImageModal>
                            <Image
                                src={props.url} //
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
                url={props.url}
            ></ImageControls>
        </Box>
    );
};

export default ImageBody;
