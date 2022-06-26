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
const AuthenticationIsRequiredModal = dynamic(() => import("@/components/create/_utils/AuthenticationIsRequiredModal"), staticImportLoader);
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
import MainWrapper from "@/components/create/_utils/MainWrapper";

interface CreateLandmarkPageProps {
    //
}
const CreateLandmarkPage: FunctionComponent<CreateLandmarkPageProps> = (props) => {
    const { isAuthenticated } = useAppSelector((state) => state.authentication);
    //
    const [activeStep, setActiveStep] = useState<number>(4);
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
                <title>Create Content | Landmark</title>
            </Head>

            {isAuthenticated === false && <AuthenticationIsRequiredModal />}

            <MainWrapper
                steps={["Destination", "Thumbnail", "General information", "Description", "Summary"]} //
                alternativeContinueCallback={activeStep === 4 ? upload : undefined}
                activeStep={stated(activeStep, setActiveStep)}
            >
                {(() => {
                    switch (activeStep) {
                        case 0:
                            return <StageOne selectedDestination={stated(selectedDestination, setSelectedDestination)}></StageOne>;
                        case 1:
                            return <StageTwo thumbnail={stated(thumbnail, setThumbnail)} thumbnailURL={stated(thumbnailURL, setThumbnailURL)}></StageTwo>;
                        case 2:
                            return (
                                <StageThree
                                    thumbnailURL={thumbnailURL} //
                                    title={stated(title, setTitle)}
                                    selectedDestination={selectedDestination}
                                    landmarkType={stated(landmarkType, setLandmarkType)}
                                    shortDescription={stated(shortDescription, setShortDescription)}
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
