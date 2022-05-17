// Tools
import { styled, alpha } from "@mui/system";
import { useRef } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI components
import Button from "@mui/material/Button";
// Material UI Icons
import FileUpload from "@mui/icons-material/FileUpload";
// Styled components
import Loading from "@/components/_utils/Loading";
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { displaySnackbar } from "@/redux/slices/snackbar";

const ThumbnailWrapper = styled("div")(({ theme }) => ({
    width: "100%",
    flexGrow: "1",
    position: "relative",
    background: alpha(theme.palette.text.primary, 0.1),
    maxHeight: "calc(100vh - 500px)",
    height: "1px",
}));

const SelectThumbnailButton = styled(Button)(({ theme }) => ({
    fontSize: "1.3rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    svg: {
        fontSize: "2rem",
    },
}));

interface SelectThumbnailProps {
    thumbnail: StatedDataField<File | null>;
    thumbnailURL: StatedDataField<string | null>;
}

const SelectThumbnail: FunctionComponent<SelectThumbnailProps> = (props) => {
    const dispatch = useAppDispatch();

    const { thumbnail, thumbnailURL } = props;
    const fileInput = useRef<HTMLInputElement | null>(null);

    const openFileBrowserWindow = () => fileInput.current?.click();
    const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | null = (e.target.files as unknown as File[])[0];
        if (file) {
            if (thumbnail.value === null)
                setTimeout(() => {
                    document.getElementById("go-forward")?.click();
                }, 1000);
            thumbnail.setValue(file);
            const reader = new FileReader();
            reader.onload = (res) => {
                if (res.target && res.target.result) thumbnailURL.setValue(res.target.result as any);
                dispatch(
                    displaySnackbar({
                        msg: `Thumbnail has been changed`,
                        severity: "success",
                        hideAfter: 2000,
                    })
                );
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <ThumbnailWrapper>
            {(() => {
                if (props.thumbnailURL.value) {
                    return (
                        <>
                            <Loading />
                            <SkeletonImage
                                src={props.thumbnailURL.value} //
                                alt="choosen-thumbnail"
                                layout="fill"
                                modalMaxResolution="1"
                                openFileSelectDialog={openFileBrowserWindow}
                            ></SkeletonImage>
                        </>
                    );
                } else {
                    return (
                        <SelectThumbnailButton color="inherit" onClick={openFileBrowserWindow}>
                            <FileUpload />
                            Select
                        </SelectThumbnailButton>
                    );
                }
            })()}
            <input
                type="file" //
                ref={fileInput as any}
                style={{ display: "none" }}
                accept="image/*"
                onChange={onFileInputChange}
            />
        </ThumbnailWrapper>
    );
};

export default SelectThumbnail;
