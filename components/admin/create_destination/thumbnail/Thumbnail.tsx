// Tools
import { useState, useRef } from "react";
import stated from "@/utils/client/stated";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Other Components
import Image from "next/image";
import { ImageControls } from "@/components/_utils/ImageControls";
import ThumbnailModal from "@/components/admin/create_destination/thumbnail/ThumbnailModal";
import ThumbnailSkeleton from "@/components/admin/create_destination/thumbnail/ThumbnailSkeleton";
import ThumbnailIsNotSelected from "@/components/admin/create_destination/thumbnail/ThumbnailIsNotSelected";
import CreateDestinationSingleStep from "@/components/admin/create_destination/_utils/layout/CreateDestinationSingleStep";

interface ThumbnailInterface {
    thumbnail: StatedDataField<File | null>;
    url: StatedDataField<string | null>;
    stepperIndex: StatedDataField<number>;
}

const Thumbnail: FunctionComponent<ThumbnailInterface> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const fileInp = useRef<HTMLInputElement | null>(null);

    const loadImageURL = (file: File) => {
        const reader = new FileReader();
        reader.onload = (r) => {
            props.url.setValue(r.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    if (props.thumbnail.value) {
        loadImageURL(props.thumbnail.value);
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0];
        if (file) {
            props.thumbnail.setValue(file);
            loadImageURL(file);
        }
    };

    return (
        <>
            <ThumbnailModal
                open={stated(open, setOpen)} //
                imageURL={props.url.value}
            ></ThumbnailModal>

            <CreateDestinationSingleStep
                stepperIndex={props.stepperIndex} //
                header="Thumbnail"
                blockGoingForward={!props.thumbnail.value}
            >
                <input type="file" ref={fileInp} style={{ display: "none" }} accept="image/*" onChange={onInputChange} />

                {(() => {
                    if (props.thumbnail.value) {
                        if (props.url.value) {
                            return <Image src={props.url.value} alt="thumbnail" layout="fill" objectFit="cover" objectPosition="center"></Image>;
                        }
                        return <ThumbnailSkeleton></ThumbnailSkeleton>;
                    } else {
                        return (
                            <ThumbnailIsNotSelected
                                browseFiles={() => fileInp.current?.click()} //
                            ></ThumbnailIsNotSelected>
                        );
                    }
                })()}

                <ImageControls
                    openModal={() => setOpen(props.url.value !== null ? true : false)} //
                    url={props.url.value}
                    openFileSelectDialog={() => fileInp.current?.click()}
                ></ImageControls>
            </CreateDestinationSingleStep>
        </>
    );
};

export default Thumbnail;
