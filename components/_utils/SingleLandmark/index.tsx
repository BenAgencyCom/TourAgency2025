// Tools
import RWD from "./RWD";
import dynamic from "next/dynamic";
import { styled } from "@mui/system";
import { useState } from "react";
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
import CardBottomNavigationWrapper from "@/components/_utils/styled/CardBottomNavigationWrapper";

const SingleLandmarkWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    "span.landmark-type": {
        position: "absolute",
        bottom: "0px",
        right: "0px",
        opacity: ".05",
        svg: {
            fontSize: "8rem",
        },
    },
    p: {
        position: "relative",
        zIndex: "2",
    },
    transition: "transform .3s !important",
    "&:hover": {
        transform: "translateY(-10px)",
    },
    "div.navigation-buttons-wrapper": {
        display: "flex",
        button: {
            marginRight: "10px",
        },
    },
    ...(RWD as any),
}));

const StyledReviewScore = styled(ReviewScore)(({ theme }) => ({
    position: "absolute", //
    top: "20px",
    left: "20px",
    zIndex: "10",
    fontSize: "3rem",
    width: "90px",
    height: "90px",
    borderRadius: "5px",
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
                className="single-landmark"
            >
                {(() => {
                    if (userReview) {
                        return (
                            <StyledReviewScore
                                type={userReview.type} //
                                points={userReview.points}
                            ></StyledReviewScore>
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

                <CardBottomNavigationWrapper>
                    <ReadMore url={`/landmarks/${slug}`}></ReadMore>
                    {(() => {
                        if (props.userReview) {
                            return (
                                <ReadMore
                                    url={`/landmarks/${slug}/reviews?pinnedReviewId=${props.userReview.id}`} //
                                    msg="See this review"
                                ></ReadMore>
                            );
                        } else {
                            return (
                                <ReadMore
                                    url={`/landmarks/${slug}/reviews`} //
                                    msg="Go to reviews"
                                ></ReadMore>
                            );
                        }
                    })()}
                </CardBottomNavigationWrapper>
            </SingleLandmarkWrapper>
        </Fade>
    );
};

export default SingleLandmark;
