// Tools
import { styled } from "@mui/system";
import { useRef, useState } from "react";
// Types
import { ImageFileMimetypes } from "@/utils/restrictions/imageFile";
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI components
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
// Material UI icons
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
// Redux
import { displaySnackbar } from "@/redux/slices/snackbar";
import { useAppDispatch } from "@/hooks/useRedux";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: "600px",
    height: "600px",
    "#avatar-icon-placeholder": {
        fontSize: "30rem",
        opacity: 0.5,
    },
    ["@media (max-width:1600px)"]: {
        width: "550px",
        height: "550px",
    },
    ["@media (max-width:1500px)"]: {
        width: "500px",
        height: "500px",
    },
    ["@media (max-width:1200px)"]: {
        width: "430px",
        height: "430px",
    },
    ["@media (max-width:1000px)"]: {
        marginBottom: "40px",
    },
    ["@media (max-width:500px)"]: {
        width: "410px",
        height: "410px",
    },
    ["@media (max-width:450px)"]: {
        width: "390px",
        height: "390px",
    },
    ["@media (max-width:410px)"]: {
        width: "370px",
        height: "370px",
    },
    ["@media (max-width:390px)"]: {
        width: "350px",
        height: "350px",
    },
    ["@media (max-width:370px)"]: {
        width: "330px",
        height: "330px",
    },
    ["@media (max-width:350px)"]: {
        width: "310px",
        height: "310px",
    },
    ["@media (max-width:330px)"]: {
        width: "290px",
        height: "290px",
    },
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
    background: theme.palette.text.primary,
    color: "#fff",
    position: "absolute",
    right: "50px",
    bottom: "50px",
    width: "60px",
    height: "60px",
    svg: {
        fontSize: "2rem",
    },
    "&:hover": {
        background: theme.palette.primary.main,
    },
    ["@media (max-width:1600px)"]: {
        right: "45px",
        bottom: "45px",
    },
    ["@media (max-width:1500px)"]: {
        right: "40px",
        bottom: "40px",
    },
    ["@media (max-width:1200px)"]: {
        right: "35px",
        bottom: "35px",
    },
    ["@media (max-width:500px)"]: {
        right: "30px",
        bottom: "30px",
    },
    ["@media (max-width:400px)"]: {
        right: "25px",
        bottom: "25px",
    },
}));

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
        if (file) {
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
        }
    };

    return (
        <div style={{ position: "relative" }}>
            {(() => {
                if (imageURL === null) {
                    return (
                        <StyledAvatar>
                            <Person id="avatar-icon-placeholder" />
                        </StyledAvatar>
                    );
                } else {
                    return <StyledAvatar src={imageURL as string}></StyledAvatar>;
                }
            })()}

            <StyledIconButton onClick={() => fileInput.current?.click()}>
                <Settings></Settings>
            </StyledIconButton>

            <input type="file" style={{ display: "none" }} ref={fileInput} accept="image/*" onChange={onInputChange} data-cy="avatar" />
        </div>
    );
};

export default AvatarAndBackground;
