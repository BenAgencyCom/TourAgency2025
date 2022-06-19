// Tools
import { useRef, useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import { ImageFileMimetypes } from "@/utils/restrictions/imageFile";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI icons
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
// Styled components
import StyledAvatar from "./styled_components/StyledAvatar";
import ChangeAvatarButton from "./styled_components/ChangeAvatarButton";

interface AvatarAndBackgroundProps {
    avatar: StatedDataField<File | null>;
}
const AvatarAndBackground: FunctionComponent<AvatarAndBackgroundProps> = (props) => {
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
