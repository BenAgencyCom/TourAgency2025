// Tools
import { styled } from "@mui/system";
// Types
import type { Landmark, LandmarkPictureResolution } from "@/@types/pages/SingleDestination";
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import BackgroundPicture from "./BackgroundPicture";
import LandmarkHeader from "./LandmarkHeader";
import LandmarkManagement from "./LandmarkManagement";
import LandmarkContentWrapper from "./LandmarkContentWrapper";
import ReadMore from "./ReadMore";
// Styled Components
const SingleLandmarkWrapper = styled(Box)(({ theme }) => ({
    margin: "0 auto",
    height: "500px",
    position: "relative",
    boxSizing: "border-box",
    borderRadius: "5px",
    img: {
        transform: "scale(1)",
        transition: "transform .3s",
    },
    "&:hover": {
        img: {
            transform: "scale(1.1)",
        },
        "div.content-shape": {
            opacity: 1,
        },
        ".read-more": {
            opacity: 1,
        },
    },
    padding: "40px",
}));

interface SingleLandmarkProps {
    data: Landmark;
    createImagePath: (resolution: LandmarkPictureResolution) => string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const SingleLandmark: FunctionComponent<SingleLandmarkProps> = (props) => {
    const width = `calc(100% - 40px)`;
    return (
        <SingleLandmarkWrapper
            sx={{ width: `${width}` }} //
        >
            <LandmarkContentWrapper
                onMouseEnter={props.onMouseEnter} //
                onMouseLeave={props.onMouseLeave}
            >
                <LandmarkManagement createImagePath={props.createImagePath}></LandmarkManagement>
                <BackgroundPicture createImagePath={props.createImagePath}></BackgroundPicture>
                <LandmarkHeader
                    title={props.data.title} //
                    type={props.data.type}
                    reviews={35}
                ></LandmarkHeader>
                <ReadMore slug={props.data.slug}></ReadMore>
            </LandmarkContentWrapper>
        </SingleLandmarkWrapper>
    );
};

export default SingleLandmark;
