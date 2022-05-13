// Tools
import RWD from "./RWD";
import { useState } from "react";
import dynamic from "next/dynamic";
import { styled } from "@mui/system";
import stated from "@/utils/client/stated";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { SimpleReview } from "@/@types/pages/landmarks/SingleLandmark";
import type { Landmark } from "@/@types/pages/destinations/SingleDestination";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other Components
import LandmarkPicture from "./LandmarkPicture";
import ReadMore from "@/components/_utils/ReadMore";
import LandmarkInformation from "./body/LandmarkInformation";
import ReviewScore from "@/components/_utils/ReviewScore";
const ToggleReviewButton = dynamic(() => import("./ToggleReviewButton"));
const ReviewInformation = dynamic(() => import("./body/ReviewInformation"));
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const SingleLandmarkWrapper = styled(FlexBox)(({ theme }) => ({
    height: "550px",
    borderRadius: "5px",
    background: "#fff",
    padding: "10px",
    cursor: "default",
    position: "relative",
    h3: {
        fontWeight: 900,
        letterSpacing: "-1px",
        margin: "0 0 10px 0",
        fontSize: "2.5rem",
        lineHeight: "40px",
    },
    "span.landmark-type": {
        position: "absolute",
        bottom: "0px",
        right: "0px",
        opacity: ".05",
        svg: {
            fontSize: "10rem",
        },
    },
    "div.single-landmark-content": {
        flexGrow: "1",
        textAlign: "start",
    },
    ...(RWD as any),
}));

interface SingleLandmarkProps {
    data: Landmark;
    sx?: SxProps;
    userReview?: SimpleReview;
    imageResolution?: "360p" | "480p" | "720p" | "1080p";
}

const SingleLandmark: FunctionComponent<SingleLandmarkProps> = (props) => {
    const { destination, slug, title, folder } = props.data;
    const { imageResolution, userReview } = props;

    const [displayReview, setDisplayReview] = useState<boolean>(false);
    const [extendReview, setExtendReview] = useState<boolean>(false);

    return (
        <Fade in={true}>
            <SingleLandmarkWrapper
                sx={props.sx} //
                column
                horizontal="start"
                className="single-landmark"
            >
                {(() => {
                    if (userReview) {
                        return (
                            <ReviewScore
                                type={userReview.type}
                                points={userReview.points}
                                sx={{
                                    position: "absolute", //
                                    top: "20px",
                                    left: extendReview ? "10px" : "20px",
                                    zIndex: "10",
                                    fontSize: "3rem",
                                    width: "90px",
                                    height: "90px",
                                    borderRadius: "5px",
                                }}
                            ></ReviewScore>
                        );
                    }
                })()}

                {(!props.userReview || !extendReview) && (
                    <LandmarkPicture title={title} city={destination.city} folder={folder} resolution={imageResolution ?? "480p"}>
                        {props.userReview && <ToggleReviewButton displayReview={stated(displayReview, setDisplayReview)}></ToggleReviewButton>}
                    </LandmarkPicture>
                )}

                <div className="single-landmark-content">
                    {(() => {
                        if (props.userReview && displayReview)
                            return (
                                <ReviewInformation
                                    userReview={props.userReview} //
                                    extendReview={stated(extendReview, setExtendReview)}
                                ></ReviewInformation>
                            );
                        else return <LandmarkInformation data={props.data}></LandmarkInformation>;
                    })()}
                </div>

                <ReadMore url={`/landmarks/${slug}`}></ReadMore>
            </SingleLandmarkWrapper>
        </Fade>
    );
};

export default SingleLandmark;
