// Tools
import { styled } from "@mui/system";
import { destinationPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Other components
import Image from "next/Image";
// Styled components
const DestinationPictureWrapper = styled("div")(({ theme }) => ({
    height: "600px",
    width: "700px",
    position: "relative",
    borderRadius: "0px 50px 0px 50px",
    overflow: "hidden",
}));

const DestinationPicture: FunctionComponent<{ folder: string }> = (props) => {
    return (
        <DestinationPictureWrapper>
            <Image
                src={destinationPictureURL(props.folder, "1080p", "thumbnail")} //
                layout="fill"
                alt=""
                objectFit="cover"
                objectPosition="center"
                priority
            ></Image>
        </DestinationPictureWrapper>
    );
};

export default DestinationPicture;
