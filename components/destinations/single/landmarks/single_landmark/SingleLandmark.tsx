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
    },
    padding: "40px",
}));
const Content = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
}));

const ContentShape = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "10px",
    transition: "opacity .3s",
    "&:nth-child(2)": {
        background: "#fff",
        width: "calc(100% + 10px)",
        height: "calc(100% + 10px)",
        transform: "translate(-50%,-50%) rotate(3deg)",
        opacity: 0.75,
    },
    "&:nth-child(3)": {
        background: theme.palette.primary.main,
        width: "calc(100% - 30px)",
        height: "calc(100% - 30px)",
        transform: "translate(-50%,-50%) rotate(-10deg)",
        opacity: 0.75,
    },
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
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            <Content>
                <Content sx={{ zIndex: 1 }}>
                    <LandmarkManagement createImagePath={props.createImagePath}></LandmarkManagement>
                    <BackgroundPicture createImagePath={props.createImagePath}></BackgroundPicture>
                    <LandmarkHeader
                        title={props.data.title} //
                        type={props.data.type} //
                        reviews={35} //
                    ></LandmarkHeader>
                </Content>

                <ContentShape className="content-shape"></ContentShape>
                <ContentShape className="content-shape"></ContentShape>
            </Content>
        </SingleLandmarkWrapper>
    );
};

export default SingleLandmark;
