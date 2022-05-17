// Tools
import { useState } from "react";
import dynamic from "next/dynamic";
import stated from "@/utils/client/stated";
// Types
import type { FunctionComponent } from "react";
import type { LandmarkType } from "@prisma/client";
import type { Destination } from "@/@types/pages/create/CreateLandmark";
// Other components
import Head from "next/Head";
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
    const [activeStep, setActiveStep] = useState<number>(2);
    const [disableContinueButton, setDisableContinueButton] = useState<boolean>(false);
    const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
    // New landmarks' data:
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [shortDescription, setShortDescription] = useState<string>("");
    const [landmarkType, setLandmarkType] = useState<LandmarkType>("ANTIQUE");
    const upload = () => alert("uploading");

    return (
        <>
            <Head>
                <title>Create Landmark</title>
            </Head>
            <MainWrapper
                steps={["Destination", "Thumbnail", "General information", "Description", "Summary"]} //
                activeStep={stated(activeStep, setActiveStep)}
                disableContinueButton={disableContinueButton}
                alternativeContinueCallback={activeStep === 4 ? upload : undefined}
            >
                {(() => {
                    switch (activeStep) {
                        case 0:
                            return (
                                <StageOne
                                    selectedDestination={stated(selectedDestination, setSelectedDestination)} //
                                ></StageOne>
                            );
                        case 1:
                            return (
                                <StageTwo
                                    thumbnail={stated(thumbnail, setThumbnail)} //
                                    thumbnailURL={stated(thumbnailURL, setThumbnailURL)}
                                ></StageTwo>
                            );
                        case 2:
                            return (
                                <StageThree
                                    thumbnailURL={thumbnailURL} //
                                    selectedDestination={selectedDestination}
                                    title={stated(title, setTitle)}
                                    shortDescription={stated(shortDescription, setShortDescription)}
                                    landmarkType={stated(landmarkType, setLandmarkType)}
                                ></StageThree>
                            );
                        case 3:
                            return <StageFour></StageFour>;
                        case 4:
                            return <StageFive></StageFive>;
                    }
                })()}
            </MainWrapper>
        </>
    );
};

export default CreateLandmarkPage;
