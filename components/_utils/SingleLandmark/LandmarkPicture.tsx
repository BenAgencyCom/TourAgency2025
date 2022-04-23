// Tools
import { styled } from "@mui/system";
import { landmarkPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Other Components
import Image from "next/Image";
const Wrapper = styled("div")(({ theme }) => ({
    width: "100%",
    height: "250px",
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
        <Wrapper className="single-landmark-picture">
            <Image
                layout="fill" //
                alt="bg"
                src={landmarkPictureURL(props.picture, props.resolution)}
            ></Image>
        </Wrapper>
    );
};

export default BackgroundPicture;
