// Tools
import { styled } from "@mui/system";
import { landmarkPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import Image from "next/Image";
const Wrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "250px",
    position: "relative",
    borderRadius: "3px 20px 3px 20px",
    overflow: "hidden",
}));

interface BackgroundPictureProps {
    picture: string;
}

const BackgroundPicture: FunctionComponent<BackgroundPictureProps> = (props) => {
    return (
        <Wrapper>
            <Image
                layout="fill" //
                alt="bg"
                src={landmarkPictureURL(props.picture, "1080p")}
                objectFit="cover"
            ></Image>
        </Wrapper>
    );
};

export default BackgroundPicture;
