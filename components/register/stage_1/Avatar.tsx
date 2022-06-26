// Tools
import { useRef, useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import { ImageFileMimetypes } from "@/utils/restrictions/imageFile";
import useRegisterContext from "@/components/register/hooks/useRegisterContext";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
// Material UI icons
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
// Styled components
import StyledAvatar from "./styled_components/StyledAvatar";
import ChangeAvatarButton from "./styled_components/ChangeAvatarButton";

const AvatarAndBackground: FunctionComponent = () => {
    const { avatar } = useRegisterContext();
    const displaySnackbar = useSnackbar();

    const fileInput = useRef<null | HTMLInputElement>(null);
    const [imageURL, setImageUrl] = useState<string | null>(null);

    const loadImageURL = (file: File) => {
        const reader = new FileReader();
        reader.onload = (r) => {
            setImageUrl(r.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    if (avatar.value) {
        loadImageURL(avatar.value);
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0];
        if (file) {
            if (ImageFileMimetypes.includes(file.type)) {
                if (file.type) avatar.setValue(file);
                loadImageURL(file);
            } else {
                avatar.setValue(null);
                setImageUrl(null);
                displaySnackbar({
                    severity: "error",
                    hideAfter: 30000,
                    msg: "Unexpected extension of the avater provided",
                });
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

            <ChangeAvatarButton onClick={() => fileInput.current?.click()}>
                <Settings></Settings>
            </ChangeAvatarButton>

            <input type="file" style={{ display: "none" }} ref={fileInput} accept="image/*" onChange={onInputChange} data-cy="avatar" />
        </div>
    );
};

export default AvatarAndBackground;
