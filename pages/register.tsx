// Tools
import { useState, useEffect } from "react";
import stated from "@/utils/client/stated";
import GuardedRoute from "@/utils/client/GuardedRoute";
import { RegisterContext } from "@/components/register/context";
import useFormFieldsWithValidation from "@/components/register/hooks/useFormFieldsWithValidation";
// Types
import type { GetServerSideProps, NextPage } from "next";
import type { Stage } from "@/components/register/@types";
// Other components
import Head from "next/head";
import Stage1 from "@/components/register/stage_1";
import Stage2 from "@/components/register/stage_2";
import Stage3 from "@/components/register/stage_3";
import StageHeader from "@/components/create/_utils/StageHeader";
import ContinueButton from "@/components/register/ContinueButton";
// Styled components
import MainWrapper from "@/components/register/MainWrapper";

const Registration: NextPage = () => {
    const [stage, setStage] = useState<Stage>("PERSONAL_DATA");
    const { data, checkWhetherAFieldIsInvalid, allFieldsAreValid } = useFormFieldsWithValidation();
    const [disableContinueButton, setDisableContinueButton] = useState<boolean>(true);

    useEffect(() => {
        if (stage === "PERSONAL_DATA") setDisableContinueButton(!allFieldsAreValid);
    }, [stage, allFieldsAreValid]);

    return (
        <>
            <Head>
                <title>MES | Register</title>
            </Head>
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
                                    return <Stage1 setDisableContinueButton={setDisableContinueButton} />;
                                case "CONFIRMATION":
                                    return (
                                        <Stage2
                                            disableContinueButton={stated(disableContinueButton, setDisableContinueButton)} //
                                        />
                                    );
                                case "RESULT":
                                    return <Stage3 setStage={setStage} />;
                            }
                        })()}
                    </div>
                    {stage !== "RESULT" && (
                        <ContinueButton
                            allFieldsAreValid={allFieldsAreValid} //
                            stage={stated(stage, setStage as any) as any}
                            disabled={disableContinueButton}
                        />
                    )}
                </MainWrapper>
            </RegisterContext.Provider>
        </>
    );
};
export const getServerSideProps: GetServerSideProps = (ctx) => GuardedRoute("anonymous", ctx);

export default Registration;
