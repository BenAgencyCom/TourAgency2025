// Tools
import { useState, useRef } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { Landmark } from "@/@types/Landmark";
// Material UI Components
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
// Other components
import ControlIcons from "@/components/admin/create_destination/landmarks/single_landmark/_ControlIcons";
import SelectPictureButton from "./SelectPictureButton";
import Image from "next/Image";
import ImageModal from "@/components/_utils/ImageModal";

interface PictureProps {
    tabIndex: number;
    picture: Landmark["picture"];
    pictureURL: Landmark["pictureURL"];
    updateData: (prop: keyof Landmark, value: Landmark[typeof prop]) => void;
}

const Picture: FunctionComponent<PictureProps> = (props) => {
    const fileInput = useRef<HTMLInputElement | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const openFileSelectDialog = () => fileInput.current?.click();

    const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0];
        if (file) {
            props.updateData("picture", file);

            const reader = new FileReader();
            reader.onload = (r) => {
                props.updateData("pictureURL", r.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ width: "100%", flexGrow: 1, my: 2, position: "relative" }}>
            <input type="file" ref={fileInput} style={{ display: "none" }} accept="image/*" onChange={onFileInputChange} />

            {(() => {
                if (props.pictureURL) {
                    return (
                        <>
                            <ImageModal open={{ value: openModal, setValue: setOpenModal }} imageURL={props.pictureURL}></ImageModal>
                            <Image
                                src={props.pictureURL} //
                                alt="picture"
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                            ></Image>
                        </>
                    );
                } else {
                    return (
                        <>
                            <Skeleton
                                animation="wave" //
                                variant="rectangular"
                                sx={{ width: "100%", height: "100%" }}
                            ></Skeleton>
                            <SelectPictureButton
                                tabIndex={props.tabIndex} //
                                onClick={openFileSelectDialog}
                            ></SelectPictureButton>
                        </>
                    );
                }
            })()}

            <ControlIcons
                picture={props.picture} //
                updateData={props.updateData}
                tabIndex={props.tabIndex}
                openModal={() => setOpenModal(true)}
                openFileSelectDialog={openFileSelectDialog}
            ></ControlIcons>
        </Box>
    );
};

export default Picture;
