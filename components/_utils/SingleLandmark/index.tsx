// Tools
import { styled } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
import type { Landmark } from "@/@types/pages/destinations/SingleDestination";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other Components
import ReadMore from "@/components/_utils/ReadMore";
import LandmarkPicture from "./LandmarkPicture";
import Header from "./Header";
import ReviewScore from "@/components/_utils/ReviewScore";
import LocalizationBreadCrumbs from "@/components/_utils/LocalizationBreadCrumbs";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const SingleLandmarkWrapper = styled(FlexBox)(({ theme }) => ({
    height: "480px",
    borderRadius: "5px",
    background: "#fff",
    padding: "10px",
    cursor: "default",
    position: "relative",
    ".read-more": {
        marginTop: "10px",
    },
    ["@media (max-width:1000px)"]: {
        width: "100%",
        margin: "60px 0 0 0",
        height: "auto",
        "&:nth-of-type(1)": {
            marginTop: "0px",
        },
        h3: {
            fontSize: "3rem !important",
        },
    },
    ["@media (max-width:700px)"]: {
        h3: {
            fontSize: "2.5rem !important",
            lineHeight: "36px",
        },
    },
    ["@media (max-width:400px)"]: {
        h3: {
            fontSize: "2rem !important",
            lineHeight: "30px",
        },
    },
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
        if (length > 40) return 0;
        else if (length > 23) return 100;
        return 150;
    })();

    return (
        <SingleLandmarkWrapper
            sx={{ width: `calc(33% - 10px)`, ...props.sx }} //
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
            <LocalizationBreadCrumbs crumbs={[destination.country, destination.city]}></LocalizationBreadCrumbs>
            <Header title={title}></Header>

            {(() => {
                if (amountOfWordsInDescription) {
                    return (
                        <Typography variant="body1" sx={{ flexGrow: 1 }}>
                            {shortDescription.slice(0, amountOfWordsInDescription)}...
                        </Typography>
                    );
                }
            })()}

            <ReadMore url={`/landmarks/${slug}`}></ReadMore>
        </SingleLandmarkWrapper>
    );
};

export default SingleLandmark;
