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
import Loading from "@/components/_utils/Loading";
const staticImportLoader = { loading: () => <Loading sx={{ mt: "100px" }} /> };
const StageOne = dynamic(() => import("@/components/create/landmark/stage_1"), staticImportLoader);
const StageTwo = dynamic(() => import("@/components/create/landmark/stage_2"), staticImportLoader);
const StageThree = dynamic(() => import("@/components/create/landmark/stage_3"), staticImportLoader);
const StageFour = dynamic(() => import("@/components/create/landmark/stage_4"), { ...staticImportLoader, ssr: false });
const StageFive = dynamic(() => import("@/components/create/landmark/stage_5"), staticImportLoader);
// Styled components
import MainWrapper from "@/components/create/_utils/MainWrapper";

interface CreateLandmarkPageProps {
    //
}
const CreateLandmarkPage: FunctionComponent<CreateLandmarkPageProps> = (props) => {
    const [activeStep, setActiveStep] = useState<number>(3);
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
                                    disableContinueButton={stated(disableContinueButton, setDisableContinueButton)}
                                ></StageOne>
                            );
                        case 1:
                            return (
                                <StageTwo
                                    thumbnail={stated(thumbnail, setThumbnail)} //
                                    thumbnailURL={stated(thumbnailURL, setThumbnailURL)}
                                    disableContinueButton={stated(disableContinueButton, setDisableContinueButton)}
                                ></StageTwo>
                            );
                        case 2:
                            return (
                                <StageThree
                                    thumbnailURL={thumbnailURL} //
                                    title={stated(title, setTitle)}
                                    selectedDestination={selectedDestination}
                                    landmarkType={stated(landmarkType, setLandmarkType)}
                                    shortDescription={stated(shortDescription, setShortDescription)}
                                    disableContinueButton={stated(disableContinueButton, setDisableContinueButton)}
                                ></StageThree>
                            );
                        case 3:
                            return <StageFour disableContinueButton={stated(disableContinueButton, setDisableContinueButton)}></StageFour>;
                        case 4:
                            return <StageFive></StageFive>;
                    }
                })()}
            </MainWrapper>
        </>
    );
};

export default CreateLandmarkPage;
