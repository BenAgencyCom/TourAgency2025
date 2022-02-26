// Tools
import { styled, alpha } from "@mui/system";
import { GetLandmarkIcon } from "@/utils/client/getLandmarkIcon";
// Types
import type { Landmark, LandmarkPictureResolution } from "@/@types/pages/SingleDestination";
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Material UI Icons
import StarBorder from "@mui/icons-material/StarBorder";
import Twitter from "@mui/icons-material/Twitter";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface LandmarkDescriptionProps {
    reviews: number;
    tweets: number;
    data: Landmark;
}
const Wrapper = styled(FlexBox)(({ theme }) => ({
    padding: "20px 10px",
    position: "relative",
    h3: {
        fontSize: "2rem",
        letterSpacing: "-2px",
        margin: "0 0 10px 0",
    },
    "&>svg": {
        position: "absolute",
        bottom: "10px",
        right: "5px",
        color: alpha("#fff", 0.3),
        fontSize: "4rem",
    },
    "&::before": {
        content: "''",
        position: "absolute",
        top: -5,
        left: 0,
        width: "100%",
        height: "20px",
        transform: "rotate(-1deg)",
        background: theme.palette.text.primary,
        zIndex: 3,
    },
    "&::after": {
        content: "''",
        position: "absolute",
        top: -8,
        left: 0,
        width: "100%",
        height: "5px",
        transform: "rotate(-1deg)",
        background: "#fff",
        zIndex: 3,
    },
}));
const LandmarkAsset = styled(FlexBox)(({ theme }) => ({
    background: "#fff",
    borderRadius: "5px",
    position: "relative",
    color: theme.palette.text.primary,
    padding: "0px 10px",
    marginRight: "10px",
    strong: {
        margin: "0 3px 0 5px",
    },
}));
const LandmarkDescription: FunctionComponent<LandmarkDescriptionProps> = (props) => {
    return (
        <Wrapper column>
            <h3>{props.data.title}</h3>

            <FlexBox>
                <LandmarkAsset vertical="center">
                    <Twitter></Twitter>
                    <strong>741</strong>
                    <span>Tweets</span>
                </LandmarkAsset>

                <LandmarkAsset vertical="center">
                    <StarBorder></StarBorder>
                    <strong>34</strong>
                    <span>Reviews</span>
                </LandmarkAsset>
            </FlexBox>

            {GetLandmarkIcon(props.data.type)}
        </Wrapper>
    );
};

export default LandmarkDescription;
