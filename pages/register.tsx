// Tools
import { styled } from "@mui/system";
import { FunctionComponent, useState } from "react";
import GuardedRoute from "@/utils/client/GuardedRoute";
// Types
import type { GetServerSideProps } from "next";
import type { CountryType } from "@/data/countries";
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

const Registration: FunctionComponent<{}> = () => {
    const [avatar, setAvatar] = useState<File | null>(null);
    // Form Data
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [country, setCountry] = useState<CountryType | null>(null);
    const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("MALE");
    const [born, setBorn] = useState<Date | null>(null);
    const [password, setPassword] = useState<string>("");
    const [passwordRepeatation, setPasswordRepeatation] = useState<string>("");
    // MOCKED
    // const [name, setName] = useState<string>("Kacper");
    // const [surname, setSurname] = useState<string>("Ksiazek");
    // const [email, setEmail] = useState<string>("jebac_gorzen@gmail.com");
    // const [country, setCountry] = useState<CountryType | null>({ code: "PL", label: "Poland", phone: "48" });
    // const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("MALE");
    // const [born, setBorn] = useState<Date | null>(new Date());
    // const [password, setPassword] = useState<string>("jebac_gorzen123");
    // const [passwordRepeatation, setPasswordRepeatation] = useState<string>("jebac_gorzen123");
    // Auxiliary
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

    const upload = () => alert("uploading");

    //
    return (
        <MainWrapper>
            <StageHeader title="Create an account" stageNumber={1} alternateBackgroundText="Register" />
            <div className="content-wrapper">
                <LeftSideContent>
                    <PersonalData
                        // Data
                        name={{ value: name, setValue: setName }}
                        surname={{ value: surname, setValue: setSurname }}
                        gender={{ value: gender, setValue: setGender }}
                        born={{ value: born, setValue: setBorn }}
                        country={{ value: country, setValue: setCountry }}
                        //
                        currentSlideIndex={currentSlideIndex}
                        updateSlideIndex={setCurrentSlideIndex}
                    />
                    <Credentials
                        // Data
                        password={{ value: password, setValue: setPassword }}
                        passwordRepeatation={{ value: passwordRepeatation, setValue: setPasswordRepeatation }}
                        email={{ value: email, setValue: setEmail }}
                        //
                        currentSlideIndex={currentSlideIndex}
                        updateSlideIndex={setCurrentSlideIndex}
                    />
                    <ContinueButton primary>Continue</ContinueButton>
                </LeftSideContent>

                <RightSide>
                    <Avatar
                        avatar={{ value: avatar, setValue: setAvatar }} //
                        currentSlideIndex={currentSlideIndex}
                        updateSlideIndex={setCurrentSlideIndex}
                    />
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
