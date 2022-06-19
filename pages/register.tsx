// Tools
import { useState } from "react";
import { styled } from "@mui/system";
import GuardedRoute from "@/utils/client/GuardedRoute";
import useFormFieldsWithValidation from "@/components/register/stage_1/hooks/useFormFieldsWithValidation";
// Types
import type { GetServerSideProps, NextPage } from "next";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import PersonalData from "@/components/register/stage_1/PersonalData";
import Credentials from "@/components/register/stage_1/Credentials";
import Avatar from "@/components/register/stage_1/Avatar";
// Styled components
import MainWrapper from "@/components/register/stage_1/styled_components/MainWrapper";
import ContinueButton from "@/components/register/stage_1/styled_components/ContinueButton";
import LeftSideContent from "@/components/register/stage_1/styled_components/LeftSideContent";

const RightSide = styled("div")(({ theme }) => ({}));

const Registration: NextPage = () => {
    const [avatar, setAvatar] = useState<File | null>(null);
    const { data, checkWhetherAFieldIsInvalid, allFieldsAreValid } = useFormFieldsWithValidation();

    const { name, surname, born, country, email, gender, password, passwordRepeatation } = data;

    //
    return (
        <MainWrapper>
            <StageHeader title="Create an account" stageNumber={1} alternateBackgroundText="Register" />
            <div className="content-wrapper">
                <LeftSideContent>
                    <PersonalData
                        name={name} //
                        born={born}
                        gender={gender}
                        surname={surname}
                        country={country}
                        checkWhetherAFieldIsInvalid={checkWhetherAFieldIsInvalid}
                    />
                    <Credentials
                        email={email} //
                        password={password}
                        passwordRepeatation={passwordRepeatation}
                        checkWhetherAFieldIsInvalid={checkWhetherAFieldIsInvalid}
                    />
                    <ContinueButton primary>Continue</ContinueButton>
                </LeftSideContent>

                <RightSide>
                    <Avatar avatar={{ value: avatar, setValue: setAvatar }} />
                </RightSide>
            </div>
            {/*  
                <Upload
                    name={name}
                    surname={surname}
                    gender={gender}
                    born={born}
                    country={country}
                    password={password}
                    passwordRepeatation={passwordRepeatation}
                    email={email}
                    avatar={avatar}
                    //
                    buttonStyles={buttonStyles}
                    currentSlideIndex={currentSlideIndex}
                    updateSlideIndex={setCurrentSlideIndex}
                ></Upload> */}
        </MainWrapper>
    );
};
export const getServerSideProps: GetServerSideProps = (ctx) => GuardedRoute("anonymous", ctx);

export default Registration;
