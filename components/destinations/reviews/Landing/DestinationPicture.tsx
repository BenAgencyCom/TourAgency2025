// Tools
import { styled } from "@mui/system";
import { destinationPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import Image from "next/Image";
// Styled components
const DestinationPictureWrapper = styled(Box)(({ theme }) => ({
    height: "600px",
    width: "700px",
    position: "relative",
    borderRadius: "0px 50px 0px 50px",
    overflow: "hidden",
}));

const DestinationPicture: FunctionComponent<{ picture: string }> = (props) => {
    return (
        <DestinationPictureWrapper>
            <Image
                src={destinationPictureURL(props.picture, "1080p", "thumbnail")} //
                layout="fill"
                alt=""
                objectFit="cover"
                objectPosition="center"
            ></Image>
        </DestinationPictureWrapper>
    );
};

export default DestinationPicture;
