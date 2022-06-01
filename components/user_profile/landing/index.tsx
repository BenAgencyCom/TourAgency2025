// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { User, PointsDistribution, LatestReview } from "@/@types/pages/UserProfile";
// Other Components
import UserAvatar from "./Avatar";
import ListPoint from "./ListPoint";
import Header from "./Header";
import Flag from "@/components/_utils/Flag";
import ReviewScore from "@/components/_utils/ReviewScore";
import PointsDistributionComponent from "@/components/_utils/PointsDistribution";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Wrapper = styled(FlexBox)(({ theme }) => ({
    marginTop: "50px",
    cursor: "default",
    position: "relative",
    zIndex: "1",
    ["@media (max-width:1000px)"]: {
        flexDirection: "column",
        alignItems: "center",
    },
}));

const Information = styled(FlexBox)(({ theme }) => ({
    flexGrow: "1",
    marginLeft: "100px",
    ["@media (max-width:1300px)"]: {
        marginLeft: "50px",
    },
    ["@media (max-width:1000px)"]: {
        marginLeft: "0",
        width: "100%",
    },
}));

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
        <Wrapper horizontal="between">
            <UserAvatar avatar={avatar as string}></UserAvatar>

            <Information column>
                <Header>{`${name} ${surname}`}</Header>
                <ListPoint label="Age">{age}</ListPoint>
                <ListPoint label="Country">
                    <Flag country={country} countryCode={countryCode} sx={{ height: "28px !important", width: "50px !important" }}></Flag>
                </ListPoint>
                <ListPoint label="Member since">{memberSince.slice(0, 10)}</ListPoint>
                <ListPoint label="Reviews in total">{reviewsInTotal}</ListPoint>

                <ListPoint label="Latest review">
                    <ReviewScore
                        type={latestReview.type} //
                        sx={{ padding: "0px 10px", borderRadius: "3px" }}
                        points={latestReview.points}
                    ></ReviewScore>
                </ListPoint>

                <PointsDistributionComponent
                    averageScore={averageScore}
                    pointsDistribution={props.pointsDistribution}
                    predominant={predominantReviewType}
                    reviewsInTotal={reviewsInTotal}
                    sx={{ mt: "20px" }}
                ></PointsDistributionComponent>
            </Information>
        </Wrapper>
    );
};

export default UserProfileLanding;
