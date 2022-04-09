// Tools
import { styled } from "@mui/system";
// Types
import type { Landmark } from "@/@types/pages/destinations/SingleDestination";
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other Components
import ReadMore from "./ReadMore";
import LandmarkPicture from "./LandmarkPicture";
import Header from "./Header";
import Localization from "./Localization";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const SingleLandmarkWrapper = styled(FlexBox)(({ theme }) => ({
    height: "500px",
    borderRadius: "5px",
    background: "#fff",
    padding: "10px",
    cursor: "default",
}));

interface SingleLandmarkProps {
    data: Landmark;
    ml: number;
}

const SingleLandmark: FunctionComponent<SingleLandmarkProps> = (props) => {
    const width = `calc(100% - 20px)`;
    const amountOfWordsInDescription: number = (() => {
        const { length } = props.data.title;
        if (length > 40) return 40;
        else if (length > 25) return 100;
        return 150;
    })();
    return (
        <SingleLandmarkWrapper
            sx={{ width: `${width}`, ml: `${props.ml}px` }} //
            column
            horizontal="start"
        >
            <LandmarkPicture picture={props.data.picture}></LandmarkPicture>
            <Localization>{props.data.destination.city}</Localization>
            <Header title={props.data.title}></Header>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {props.data.shortDescription.slice(0, amountOfWordsInDescription)}...
            </Typography>
            <ReadMore slug={props.data.slug}></ReadMore>
        </SingleLandmarkWrapper>
    );
};

export default SingleLandmark;
