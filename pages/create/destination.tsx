// Tools
import { useState } from "react";
import dynamic from "next/dynamic";
import stated from "@/utils/client/stated";
import CreateDestinationContextProvider from "@/components/create/destination/CreateDestinationContextProvider";
// Types
import type { FunctionComponent } from "react";
// Other components
import Head from "next/head";
import Loading from "@/components/_utils/Loading";
const staticImportLoader = { loading: () => <Loading sx={{ mt: "100px" }} /> };
const StageOne = dynamic(() => import("@/components/create/destination/stage_1"), staticImportLoader);
const StageTwo = dynamic(() => import("@/components/create/destination/stage_2"), staticImportLoader);
const StageThree = dynamic(() => import("@/components/create/destination/stage_3"), staticImportLoader);
const StageFour = dynamic(() => import("@/components/create/destination/stage_4"), { ...staticImportLoader, ssr: false });
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
                <title>Create Content | Destination</title>
            </Head>

            {isAuthenticated === false && <AuthenticationIsRequiredModal />}

            <MainWrapper
                steps={["General information", "Thumbnail", "Description", "Summary"]} //
                alternativeContinueCallback={activeStep === 3 ? upload : undefined}
                activeStep={stated(activeStep, setActiveStep)}
                hideNavigation={fireUploading}
            >
                <CreateDestinationContextProvider>
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
                        }
                    })()}
                </CreateDestinationContextProvider>
            </MainWrapper>
        </>
    );
};

export default CreateLandmarkPage;
