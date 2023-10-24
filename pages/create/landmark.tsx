// Tools
import { useState } from "react";
import dynamic from "next/dynamic";
import stated from "@/utils/client/stated";
import CreateLandmarkContextProvider from "@/components/create/landmark/CreateLandmarkContextProvider";
// Types
import type { FunctionComponent } from "react";
// Other components
import Head from "next/head";
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

const CreateLandmarkPage: FunctionComponent = () => {
    const { isAuthenticated } = useAppSelector((state) => state.authentication);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [fireUploading, setFireUploading] = useState<boolean>(false);

    const upload = () => setFireUploading(true);

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
                hideNavigation={fireUploading}
            >
                <CreateLandmarkContextProvider>
                    {(() => {
                        switch (activeStep) {
                            case 0:
                                return <StageOne />;
                            case 1:
                                return <StageTwo />;
                            case 2:
                                return <StageThree />;
                            case 3:
                                return <StageFour />;
                            case 4:
                                return (
                                    <StageFive
                                        fireUploading={fireUploading} //
                                        isAuthenticated={isAuthenticated}
                                        goBack={() => {
                                            setActiveStep(3);
                                            setFireUploading(false);
                                        }}
                                    />
                                );
                        }
                    })()}
                </CreateLandmarkContextProvider>
            </MainWrapper>
        </>
    );
};

export default CreateLandmarkPage;
