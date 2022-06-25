// Tools
import { useState } from "react";
import stated from "@/utils/client/stated";
import GuardedRoute from "@/utils/client/GuardedRoute";
import { RegisterContext } from "@/components/register/context";
import useFormFieldsWithValidation from "@/components/register/hooks/useFormFieldsWithValidation";
// Types
import type { GetServerSideProps, NextPage } from "next";
import type { Stage } from "@/components/register/@types";
// Other components
import Stage1 from "@/components/register/stage_1";
import Stage2 from "@/components/register/stage_2";
import Stage3 from "@/components/register/stage_3";
import StageHeader from "@/components/create/_utils/StageHeader";
import ContinueButton from "@/components/register/ContinueButton";
// Styled components
import MainWrapper from "@/components/register/MainWrapper";

const Registration: NextPage = () => {
    const [stage, setStage] = useState<Stage>("CONFIRMATION");
    const { data, checkWhetherAFieldIsInvalid, allFieldsAreValid } = useFormFieldsWithValidation();
    const [disableContinueButton, setDisableContinueButton] = useState<boolean>(false);

    return (
        <RegisterContext.Provider
            value={{
                ...data,
                checkWhetherAFieldIsInvalid,
            }}
        >
            <MainWrapper>
                <StageHeader
                    title="Create an account" //
                    alternateBackgroundText="Register"
                    stageNumber={1}
                ></StageHeader>
                <div className="content-wrapper">
                    {(() => {
                        switch (stage) {
                            case "PERSONAL_DATA":
                                return <Stage1 />;
                            case "CONFIRMATION":
                                return (
                                    <Stage2
                                        disableContinueButton={stated(disableContinueButton, setDisableContinueButton)} //
                                    />
                                );
                            case "RESULT":
                                return <Stage3 />;
                        }
                    })()}
                </div>
                {stage !== "RESULT" && (
                    <ContinueButton
                        allFieldsAreValid={allFieldsAreValid} //
                        stage={stated(stage, setStage)}
                        disabled={disableContinueButton}
                    />
                )}
            </MainWrapper>
        </RegisterContext.Provider>
    );
};
export const getServerSideProps: GetServerSideProps = (ctx) => GuardedRoute("anonymous", ctx);

export default Registration;
