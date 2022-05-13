// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Other Components
import ImageModal from "@/components/_utils/ImageModal";

interface ThumbnailModalProps {
    open: StatedDataField<boolean>;
    imageURL: string | null;
}

const ThumbnailModal: FunctionComponent<ThumbnailModalProps> = (props) => {
    if (props.imageURL !== null) {
        return (
            <ImageModal
                open={props.open}
                imageURL={props.imageURL} //
            ></ImageModal>
        );
    } else return <></>;
};

export default ThumbnailModal;
