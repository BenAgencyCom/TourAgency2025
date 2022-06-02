// Tools
import { useRef } from "react";
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { ImageContentField } from "@/@types/Description";
// Other components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";
// Styled components
import Button from "@/components/create/_utils/forms/Button";

const ImageFieldWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    width: "100%",
    display: "flex",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    overflow: "hidden",
    background: "rgb(230, 233, 236)",
    "&.splitted": {
        flexGrow: "1",
    },
    "&.full-size": {
        height: "600px",
    },
}));

interface ImageBodyProps {
    url: string | null;
    updateSingleProp: (prop: keyof ImageContentField, val: ImageContentField[typeof prop]) => void;
    split?: true;
    splittedFieldUpdate?: (data: { src: File; url: string }) => void;
    isDragging: boolean;
}

const ImageBody: FunctionComponent<ImageBodyProps> = (props) => {
    const fileInput = useRef<HTMLInputElement | null>(null);

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
        <ImageFieldWrapper
            className={[
                props.split ? "splitted" : "full-size", //
                "image-field",
            ].join(" ")}
        >
            {!props.isDragging && (
                <>
                    {(() => {
                        if (props.url) {
                            return (
                                <SkeletonImage
                                    src={props.url} //
                                    alt="choosen-thumbnail"
                                    layout="fill"
                                    modalMaxResolution="1"
                                    openFileSelectDialog={openFileSelectDialog}
                                ></SkeletonImage>
                            );
                        } else {
                            return (
                                <Button primary onClick={openFileSelectDialog}>
                                    Add image
                                </Button>
                            );
                        }
                    })()}
                </>
            )}

            <input
                type="file" //
                ref={fileInput}
                style={{ display: "none" }}
                accept="image/*"
                onChange={onFileInputChange}
            />
        </ImageFieldWrapper>
    );
};

export default ImageBody;
