// Tools
import { styled, alpha } from "@mui/system";
import { GetLandmarkIcon } from "@/utils/client/getLandmarkIcon";
// Types
import type { Landmark } from "@/@types/pages/SingleDestination";
import type { FunctionComponent } from "react";
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
    position: "relative",
    maxHeight: "170px",
    transition: "max-height .3s",
    h3: {
        fontSize: "2rem",
        letterSpacing: "-2px",
        margin: "20px 0 10px 10px",
    },
    "&>svg": {
        position: "absolute",
        bottom: "10px",
        right: "5px",
        color: alpha("#fff", 0.3),
        fontSize: "4rem",
    },
    "&::before,&::after": {
        content: "''",
        position: "absolute",
        top: -5,
        left: 0,
        width: "100%",
        transform: "rotate(-1deg)",
        zIndex: 3,
        transition: "opacity .3s",
    },
    "&::before": {
        height: "20px",
        background: theme.palette.text.primary,
    },
    "&::after": {
        height: "5px",
        background: "#fff",
    },
}));
const LandmarkAsset = styled(FlexBox)(({ theme }) => ({
    background: "#fff",
    borderRadius: "5px",
    position: "relative",
    color: theme.palette.text.primary,
    padding: "0px 10px",
    marginLeft: "10px",
    strong: {
        margin: "0 3px 0 5px",
    },
}));
const LandmarkDescription: FunctionComponent<LandmarkDescriptionProps> = (props) => {
    return (
        <Wrapper column className="landmark-description">
            <h3>{props.data.title}</h3>

            <FlexBox sx={{ marginBottom: "20px" }}>
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
