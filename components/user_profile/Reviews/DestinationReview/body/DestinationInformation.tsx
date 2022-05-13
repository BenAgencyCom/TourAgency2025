// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { DestinationReview } from "@/@types/pages/UserProfile";
// Material UI
import Typography from "@mui/material/Typography";
// Other components
import LocalizationBreadCrumbs from "@/components/_utils/LocalizationBreadCrumbs";

const CityName = styled("h3")(({ theme }) => ({
    margin: "0 0 10px 0",
    letterSpacing: "-1px",
    fontSize: "3rem",
    fontWeight: 900,
    lineHeight: "50px",
}));

interface DestinationInformationProps {
    data: DestinationReview;
}

const DestinationInformation: FunctionComponent<DestinationInformationProps> = (props) => {
    const { city, shortDescription, continent, country } = props.data.destination;

    return (
        <>
            <LocalizationBreadCrumbs crumbs={[continent, country]}></LocalizationBreadCrumbs>
            <CityName>{city}</CityName>
            <Typography variant="body2" sx={{ mb: "10px" }}>
                {shortDescription}...
            </Typography>
        </>
    );
};

export default DestinationInformation;
