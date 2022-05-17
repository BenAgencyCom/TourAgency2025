// Tools
import { useState } from "react";
import dynamic from "next/dynamic";
import stated from "@/utils/client/stated";
// Types
import type { FunctionComponent } from "react";
// Other components
const StageOne = dynamic(() => import("@/components/create/landmark/stage_1"));
const StageTwo = dynamic(() => import("@/components/create/landmark/stage_2"));
const StageThree = dynamic(() => import("@/components/create/landmark/stage_3"));
const StageFour = dynamic(() => import("@/components/create/landmark/stage_4"));
const StageFive = dynamic(() => import("@/components/create/landmark/stage_5"));
// Styled components
import MainWrapper from "@/components/create/_utils/MainWrapper";

interface CreateLandmarkPageProps {
    //
}

const CreateLandmarkPage: FunctionComponent<CreateLandmarkPageProps> = (props) => {
    const [activeStep, setActiveStep] = useState<number>(1);
    const [disableContinueButton, setDisableContinueButton] = useState<boolean>(false);
    const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
    // New landmarks' data:
    const [destinationID, setDestinationID] = useState<string | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const upload = () => alert("uploading");

    return (
        <MainWrapper
            steps={["Destination", "Thumbnail", "General information", "Description", "Summary"]} //
            activeStep={stated(activeStep, setActiveStep)}
            disableContinueButton={disableContinueButton}
            alternativeContinueCallback={activeStep === 4 ? upload : undefined}
        >
            {(() => {
                switch (activeStep) {
                    case 0:
                        return <StageOne destinationID={stated(destinationID, setDestinationID)}></StageOne>;
                    case 1:
                        return (
                            <StageTwo
                                thumbnail={stated(thumbnail, setThumbnail)} //
                                thumbnailURL={stated(thumbnailURL, setThumbnailURL)}
                            ></StageTwo>
                        );
                    case 2:
                        return <StageThree></StageThree>;
                    case 3:
                        return <StageFour></StageFour>;
                    case 4:
                        return <StageFive></StageFive>;
                }
            })()}
        </MainWrapper>
    );
};

export default CreateLandmarkPage;
