// Tools
import { useRef } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Icons
import FileUpload from "@mui/icons-material/FileUpload";
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { displaySnackbar } from "@/redux/slices/snackbar";
// Styled components
import Loading from "@/components/_utils/Loading";
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";
import ThumbnailWrapper from "./styled_components/ThumbnailWrapper";
import SelectThumbnailButton from "./styled_components/SelectThumbnailButton";

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
                if (thumbnailURL.value) {
                    return (
                        <>
                            <Loading />
                            <SkeletonImage
                                src={thumbnailURL.value} //
                                alt="choosen-thumbnail"
                                layout="fill"
                                modalMaxResolution="1"
                                objectFit="contain"
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
