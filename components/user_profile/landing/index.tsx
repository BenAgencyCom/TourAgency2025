// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { User, PointsDistribution, LatestReview } from "@/@types/pages/UserProfile";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other Components
import UserAvatar from "./Avatar";
import ListPoint from "./ListPoint";
import Header from "./Header";
import Flag from "@/components/_utils/Flag";
import ReviewScore from "@/components/_utils/ReviewScore";
import PointsDistributionComponent from "@/components/_utils/PointsDistribution";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface UserProfileLanding {
    user: User;
    pointsDistribution: PointsDistribution;
    latestReview: LatestReview;
}

const UserProfileLanding: FunctionComponent<UserProfileLanding> = (props) => {
    const { avatar, memberSince, country, countryCode, name, surname, age } = props.user;
    const { reviewsInTotal, averageScore, PREDOMINANT: predominantReviewType } = props.pointsDistribution;
    const { latestReview } = props;

    return (
        <FlexBox horizontal="between" sx={{ mt: "50px", cursor: "default" }}>
            <UserAvatar avatar={avatar as string}></UserAvatar>

            <FlexBox column sx={{ flexGrow: `1`, ml: "100px" }}>
                <Header>{`${name} ${surname}`}</Header>
                <ListPoint label="Age">{age}</ListPoint>
                <ListPoint label="Country">
                    <Flag country={country} countryCode={countryCode} sx={{ height: "28px" }}></Flag>
                </ListPoint>
                <ListPoint label="Member since">{memberSince.slice(0, 10)}</ListPoint>
                <ListPoint label="Reviews in total">{reviewsInTotal}</ListPoint>

                <ListPoint label="Latest review">
                    <ReviewScore type={latestReview.type} sx={{ padding: "0px 10px" }}>
                        {latestReview.points}
                    </ReviewScore>
                </ListPoint>

                <Typography variant="h4" sx={{ my: "20px" }}>
                    Reviews distribution
                </Typography>
                <PointsDistributionComponent
                    hideBasedOn
                    averageScore={averageScore}
                    pointsDistribution={props.pointsDistribution}
                    predominant={predominantReviewType}
                    reviewsInTotal={reviewsInTotal}
                ></PointsDistributionComponent>
            </FlexBox>
        </FlexBox>
    );
};

export default UserProfileLanding;
