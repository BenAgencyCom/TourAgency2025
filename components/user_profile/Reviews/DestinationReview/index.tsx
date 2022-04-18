// Tools
import { styled } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { DestinationReview } from "@/@types/pages/UserProfile";
// Material UI
import Typography from "@mui/material/Typography";
// Other components
import Map from "./Map";
import Picture from "./Picture";
import CityName from "./CityName";
import ReadMore from "./ReadMore";
import Review from "./Review";
import LocalizationBreadCrumbs from "@/components/_utils/LocalizationBreadCrumbs";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";
const DestinationReviewWrapper = styled("div")(({ theme }) => ({
    width: "calc(50% - 20px)",
    background: "white",
    borderRadius: "10px",
    padding: "10px",
    position: "relative",
}));
interface DestinationReviewProps {
    data: DestinationReview;
    sx?: SxProps;
}

const SingleDestinationReview: FunctionComponent<DestinationReviewProps> = (props) => {
    const { folder, city, shortDescription, slug, continent, country } = props.data.destination;
    const { type, points } = props.data;
    return (
        <DestinationReviewWrapper sx={props.sx}>
            <Picture folder={folder}></Picture>
            <Review type={type} points={points}></Review>

            <FlexBox column sx={{ position: "relative" }}>
                <Map continent={continent}></Map>
                <FlexBox column horizontal="start" sx={{ position: "relative", zIndex: "1" }}>
                    <LocalizationBreadCrumbs crumbs={[continent, country]}></LocalizationBreadCrumbs>
                    <CityName>{city}</CityName>
                    <Typography variant="body1" sx={{ mb: "10px" }}>
                        {shortDescription}
                    </Typography>
                    <ReadMore slug={slug}></ReadMore>
                </FlexBox>
            </FlexBox>
        </DestinationReviewWrapper>
    );
};

export default SingleDestinationReview;
