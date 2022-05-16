// Tools
import { useState } from "react";
import dynamic from "next/dynamic";
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
    const [activeStep, setActiveStep] = useState<number>(0);
    return (
        <MainWrapper
            steps={["Destination", "Thumbnail", "General information", "Description", "Summary"]} //
            activeSectionIndex={activeStep}
        >
            {(() => {
                switch (activeStep) {
                    case 0:
                        return <StageOne></StageOne>;
                    case 1:
                        return <StageTwo></StageTwo>;
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
