// Tools
import { styled } from "@mui/system";
import RWD from "./RWD";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
import type { Landmark } from "@/@types/pages/destinations/SingleDestination";
// Material UI Components
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
// Other Components
import ReadMore from "@/components/_utils/ReadMore";
import LandmarkPicture from "./LandmarkPicture";
import ReviewScore from "@/components/_utils/ReviewScore";
import LocalizationBreadCrumbs from "@/components/_utils/LocalizationBreadCrumbs";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const SingleLandmarkWrapper = styled(FlexBox)(({ theme }) => ({
    height: "550px",
    borderRadius: "5px",
    background: "#fff",
    padding: "10px",
    cursor: "default",
    position: "relative",
    ".read-more": {
        marginTop: "10px",
    },
    h3: {
        fontWeight: 900,
        letterSpacing: "-1px",
        margin: "0 0 10px 0",
        fontSize: "2.5rem",
        lineHeight: "40px",
    },
    ...(RWD as any),
}));

interface SingleLandmarkProps {
    data: Landmark;
    sx?: SxProps;
    userReview?: {
        type: ReviewType;
        points: number;
    };
    imageResolution?: "360p" | "480p" | "720p" | "1080p";
}

const SingleLandmark: FunctionComponent<SingleLandmarkProps> = (props) => {
    const { destination, slug, title, picture, shortDescription } = props.data;
    const { imageResolution, userReview } = props;

    const amountOfWordsInDescription: number = (() => {
        const { length } = props.data.title;
        if (length > 40) return 35;
        else if (length > 23) return 60;
        return 120;
    })();

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
                                sx={{
                                    position: "absolute", //
                                    top: "20px",
                                    left: "20px",
                                    zIndex: "10",
                                    fontSize: "3rem",
                                    width: "90px",
                                    height: "90px",
                                    borderRadius: "5px",
                                }}
                            >
                                {userReview.points}
                            </ReviewScore>
                        );
                    }
                })()}

                <LandmarkPicture picture={picture} resolution={imageResolution ?? "480p"}></LandmarkPicture>
                <LocalizationBreadCrumbs crumbs={[destination.country, destination.city]} sx={{ fontSize: "1.2rem" }}></LocalizationBreadCrumbs>
                <h3>{title}</h3>

                {(() => {
                    if (amountOfWordsInDescription) {
                        return (
                            <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                {shortDescription.slice(0, amountOfWordsInDescription)}...
                            </Typography>
                        );
                    }
                })()}

                <ReadMore url={`/landmarks/${slug}`}></ReadMore>
            </SingleLandmarkWrapper>
        </Fade>
    );
};

export default SingleLandmark;
