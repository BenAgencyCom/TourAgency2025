// Tools
import { useState } from "react";
import { styled } from "@mui/system";
import stated from "@/utils/client/stated";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { DestinationReview } from "@/@types/pages/UserProfile";
// Other components
import Review from "./Review";
import Picture from "./Picture";
import ReadMore from "@/components/_utils/ReadMore";
import ReviewInformation from "./body/ReviewInformation";
import DestinationInformation from "./body/DestinationInformation";
import FieldBackgroundMap from "@/components/_utils/FieldBackgroundMap";
import ToggleReviewButton from "@/components/_utils/SingleLandmark/ToggleReviewButton";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";
const DestinationReviewWrapper = styled("div")(({ theme }) => ({
    width: "calc(50% - 20px)",
    background: "white",
    borderRadius: "10px",
    padding: "10px",
    position: "relative",
    height: "620px",
    ".single-destination-review-body": {
        position: "relative",
        zIndex: "1",
        height: "250px",
        p: {
            flexGrow: 1,
        },
    },
    ".single-destination-review-picture": {
        height: "350px",
    },
}));
interface DestinationReviewProps {
    data: DestinationReview;
    sx?: SxProps;
}

const SingleDestinationReview: FunctionComponent<DestinationReviewProps> = (props) => {
    const { folder, city, slug, continent, country } = props.data.destination;
    const { type, points } = props.data;

    const [displayReview, setDisplayReview] = useState<boolean>(false);
    const [extendReview, setExtendReview] = useState<boolean>(false);

    return (
        <DestinationReviewWrapper sx={props.sx}>
            {!extendReview && (
                <Picture folder={folder} country={country} city={city}>
                    <ToggleReviewButton displayReview={stated(displayReview, setDisplayReview)}></ToggleReviewButton>
                </Picture>
            )}
            <Review type={type} points={points}></Review>

            <FlexBox column sx={{ position: "relative" }}>
                <FieldBackgroundMap continent={continent}></FieldBackgroundMap>

                <FlexBox column horizontal="start" className="single-destination-review-body">
                    {(() => {
                        if (displayReview)
                            return (
                                <ReviewInformation
                                    userReview={{
                                        createdAt: props.data.createdAt as any,
                                        id: props.data.id,
                                        points: props.data.points,
                                        review: props.data.review,
                                        tags: props.data.tags as any,
                                        type: props.data.type,
                                    }}
                                    extendReview={stated(extendReview, setExtendReview)}
                                ></ReviewInformation>
                            );
                        else return <DestinationInformation data={props.data}></DestinationInformation>;
                    })()}
                    <ReadMore url={`/destinations/${slug}`}></ReadMore>
                </FlexBox>
            </FlexBox>
        </DestinationReviewWrapper>
    );
};

export default SingleDestinationReview;
