import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StagedDataField";
import { useRef, useState } from "react";
// My components
import StepHeader from "@/components/register/stepper/StepHeader";
import StepNavigaton from "@/components/register/stepper/StepNavagation";
// Material UI components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
// Material UI icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";

import styles from "@/sass/pages/register.module.sass";

interface AvatarAndBackgroundProps {
    avatar: StatedDataField<File | null>;
    currentSlideIndex: number;
    updateSlideIndex: (x: number) => void;
}
const AvatarAndBackground: FunctionComponent<AvatarAndBackgroundProps> = (props) => {
    const fileInput = useRef<null | HTMLInputElement>(null);
    const [imageURL, setImageUrl] = useState<string | null>(null);

    const loadImageURL = (file: File) => {
        const reader = new FileReader();
        reader.onload = (r) => {
            setImageUrl(r.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    if (props.avatar.value) {
        loadImageURL(props.avatar.value);
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0];
        if (file) {
            props.avatar.setValue(file);
            loadImageURL(file);
        }
    };

    return (
        <Fade in={true}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <StepHeader
                    header="Avatar" //
                ></StepHeader>

                <Box sx={{ display: "flex", flexDirection: "column", position: "relative" }}>
                    {(() => {
                        if (imageURL === null) {
                            return (
                                <Avatar className={styles.avatar}>
                                    <AccountCircle></AccountCircle>
                                </Avatar>
                            );
                        } else {
                            return (
                                <Avatar
                                    className={styles.avatar}
                                    src={imageURL as string}
                                    sx={{
                                        border: "5px solid", //
                                        borderColor: "primary.main",
                                    }}
                                ></Avatar>
                            );
                        }
                    })()}
                    <IconButton className={styles.avatar_badge} onClick={() => fileInput.current?.click()}>
                        <Avatar sx={{ backgroundColor: "primary.main", width: "100%", height: "100%" }}>
                            <Settings></Settings>
                        </Avatar>
                    </IconButton>
                </Box>

                <input type="file" style={{ display: "none" }} ref={fileInput} accept="image/*" onChange={onInputChange} />

                <StepNavigaton
                    currentSlideIndex={props.currentSlideIndex} //
                    updateSlideIndex={props.updateSlideIndex}
                    blockContinue={false}
                    continueMsg={imageURL ? "Continue" : "Skip"}
                ></StepNavigaton>
            </Box>
        </Fade>
    );
};

export default AvatarAndBackground;
