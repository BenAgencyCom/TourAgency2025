// Tools
import { styled } from "@mui/system";
import { destinationPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Other components
import Image from "next/Image";
// Styled components
const PictureWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: "350px",
    borderRadius: "10px",
    overflow: "hidden",
}));

const Picture: FunctionComponent<{ folder: string }> = (props) => {
    return (
        <PictureWrapper>
            <Image
                layout="fill" //
                alt={props.folder}
                objectFit="cover"
                objectPosition="center"
                src={destinationPictureURL(props.folder, "480p", "thumbnail")}
            ></Image>
        </PictureWrapper>
    );
};

export default Picture;
