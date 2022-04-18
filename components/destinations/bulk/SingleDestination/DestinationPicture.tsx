// Tools
import { styled } from "@mui/system";
import { destinationPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Other Components
import Image from "next/Image";
const Wrapper = styled("div")(({ theme }) => ({
    width: "50%",
    height: "400px",
    position: "relative",
    borderRadius: "3px 20px 3px 20px",
    overflow: "hidden",
}));

interface BackgroundPictureProps {
    picture: string;
    resolution: "360p" | "480p" | "720p" | "1080p";
}

const BackgroundPicture: FunctionComponent<BackgroundPictureProps> = (props) => {
    return (
        <Wrapper>
            <Image
                layout="fill" //
                alt="bg"
                src={destinationPictureURL(props.picture, props.resolution, "thumbnail")}
            ></Image>
        </Wrapper>
    );
};

export default BackgroundPicture;
