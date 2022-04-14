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
import ReadMore from "./ReadMore";
import LandmarkPicture from "./LandmarkPicture";
import Header from "./Header";
import Localization from "./Localization";
import ReviewScore from "@/components/_utils/ReviewScore";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const SingleLandmarkWrapper = styled(FlexBox)(({ theme }) => ({
    height: "480px",
    borderRadius: "5px",
    background: "#fff",
    padding: "10px",
    cursor: "default",
    position: "relative",
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
    const width = `calc(33% - 10px)`;
    const amountOfWordsInDescription: number = (() => {
        const { length } = props.data.title;
        if (length > 40) return 40;
        else if (length > 25) return 100;
        return 150;
    })();
    return (
        <SingleLandmarkWrapper
            sx={{ width: `${width}`, ...props.sx }} //
            column
            horizontal="start"
        >
            {(() => {
                if (props.userReview) {
                    return (
                        <ReviewScore
                            type={props.userReview.type}
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
                            {props.userReview.points}
                        </ReviewScore>
                    );
                }
            })()}

            <LandmarkPicture picture={props.data.picture} resolution={props.imageResolution ?? "480p"}></LandmarkPicture>
            <Localization destination={props.data.destination}></Localization>
            <Header title={props.data.title}></Header>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {props.data.shortDescription.slice(0, amountOfWordsInDescription)}...
            </Typography>
            <ReadMore slug={props.data.slug}></ReadMore>
        </SingleLandmarkWrapper>
    );
};

export default SingleLandmark;
