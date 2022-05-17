// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { LandmarkType } from "@prisma/client";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { Destination } from "@/@types/pages/create/CreateLandmark";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import Thumbnail from "./right_side/Thumbnail";
import Map from "./right_side/Map";
import Title from "./left_side/Title";
import ShortDescription from "./left_side/ShortDescription";
import SelectLandmarkType from "./left_side/SelectLandmarkType";
// Styled components
const StageContentWrapper = styled("div")(({ theme }) => ({
    flexGrow: "1",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
}));
const ContentColumn = styled("div")(({ theme }) => ({
    width: "calc(50% - 25px)",
    display: "flex",
    flexDirection: "column",
    "&#right-side": {
        justifyContent: "space-between",
    },
}));

interface StageOneProps {
    thumbnailURL: string | null;
    selectedDestination: Destination | null;
    title: StatedDataField<string>;
    shortDescription: StatedDataField<string>;
    landmarkType: StatedDataField<LandmarkType>;
}

const StageOne: FunctionComponent<StageOneProps> = (props) => {
    const { selectedDestination, thumbnailURL, title, shortDescription, landmarkType } = props;
    return (
        <>
            <StageHeader title="General information" stageNumber={3}></StageHeader>
            <StageContentWrapper>
                <ContentColumn id="left-side">
                    <Title title={title}></Title>
                    <ShortDescription shortDescription={shortDescription} sx={{ mt: "50px" }}></ShortDescription>
                    <SelectLandmarkType landmarkType={landmarkType} sx={{ mt: "50px" }}></SelectLandmarkType>
                </ContentColumn>{" "}
                <ContentColumn id="right-side">
                    <Thumbnail thumbnailURL={thumbnailURL}></Thumbnail>
                    <Map continent={selectedDestination?.continent ?? "blank"} />
                </ContentColumn>
            </StageContentWrapper>
        </>
    );
};

export default StageOne;
