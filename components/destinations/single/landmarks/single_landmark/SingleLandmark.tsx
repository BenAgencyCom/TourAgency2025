// Tools
import { styled } from "@mui/system";
// Types
import type { Landmark } from "@/@types/pages/destinations/SingleDestination";
import type { FunctionComponent } from "react";
// Other Components
import ReadMore from "./ReadMore";
import LandmarkPicture from "./LandmarkPicture";
import LandmarkDescription from "./LandmarkDescription";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";
const SingleLandmarkWrapper = styled(FlexBox)(({ theme }) => ({
    margin: "0 auto",
    height: "500px",
    position: "relative",
    boxSizing: "border-box",
    borderRadius: "5px",
    overflow: "hidden",
    background: theme.palette.text.primary,
    color: "#fff",
    "&:hover": {
        ".read-more": {
            opacity: 1,
        },
        ".landmark-description": {
            maxHeight: 0,
            "&::before,&::after": {
                opacity: 0,
            },
            "&>svg": {
                opacity: 0,
            },
        },
    },
}));

interface SingleLandmarkProps {
    data: Landmark;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const SingleLandmark: FunctionComponent<SingleLandmarkProps> = (props) => {
    const width = `calc(100% - 20px)`;
    return (
        <SingleLandmarkWrapper
            sx={{ width: `${width}` }} //
            column
        >
            <LandmarkPicture
                picture={props.data.picture} //
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
            >
                <ReadMore slug={props.data.slug}></ReadMore>
            </LandmarkPicture>

            <LandmarkDescription
                data={props.data} //
                reviews={34}
                tweets={3213}
            ></LandmarkDescription>
        </SingleLandmarkWrapper>
    );
};

export default SingleLandmark;
