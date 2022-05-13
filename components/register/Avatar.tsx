// Tools
import { useRef, useState } from "react";
// Types
import { ImageFileMimetypes } from "@/utils/restrictions/imageFile";
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
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
// Redux
import { displaySnackbar } from "@/redux/slices/snackbar";
import { useAppDispatch } from "@/hooks/useRedux";
// Styles
import styles from "@/sass/pages/register.module.sass";

interface AvatarAndBackgroundProps {
    avatar: StatedDataField<File | null>;
    currentSlideIndex: number;
    updateSlideIndex: (x: number) => void;
}
const AvatarAndBackground: FunctionComponent<AvatarAndBackgroundProps> = (props) => {
    const dispatch = useAppDispatch();
    const [blockContinue, setBlockContinue] = useState<boolean>(false);
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
        if (ImageFileMimetypes.includes(file.type)) {
            if (file.type) props.avatar.setValue(file);
            loadImageURL(file);
        } else {
            props.avatar.setValue(null);
            setBlockContinue(false);
            setImageUrl(null);
            dispatch(
                displaySnackbar({
                    severity: "error",
                    hideAfter: 30000,
                    msg: "Unexpected extension of the avater provided",
                })
            );
        }
    };

    return (
        <Fade in={true}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                <StepHeader
                    header="Avatar" //
                ></StepHeader>

                <Box className={styles["content-wrapper"]}>
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
                                    data-cy="avatar-preview"
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

                <input type="file" style={{ display: "none" }} ref={fileInput} accept="image/*" onChange={onInputChange} data-cy="avatar" />

                <StepNavigaton
                    currentSlideIndex={props.currentSlideIndex} //
                    updateSlideIndex={props.updateSlideIndex}
                    blockContinue={blockContinue}
                    continueMsg={imageURL ? "Continue" : "Skip"}
                ></StepNavigaton>
            </Box>
        </Fade>
    );
};

export default AvatarAndBackground;
