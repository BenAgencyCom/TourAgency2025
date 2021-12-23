import Router from "next/router";
import { FunctionComponent, useState } from "react";
//
import type { CountryType } from "@/data/countries";
// My components
import Stepper from "@/components/register/stepper/Stepper";
// Sections
import PersonalData from "@/components/register/PersonalData";
import Credentials from "@/components/register/Credentials";
import Avatar from "@/components/register/Avatar";
import Upload from "@/components/register/Upload";
// Material UI components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
// NextJS compoennts
import Image from "next/Image";
import Link from "next/link";
// Redux
import { useAppSelector } from "@/redux/hooks";
// Styles
import backgroundImage from "@/public/images/register/bgc.jpg";
import styles from "@/sass/pages/register.module.sass";
import bgIMGStyles from "@/sass/large_image_as_background.module.sass";

const Registration: FunctionComponent<{}> = () => {
    const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
    if (isAuthenticated) Router.push("/");

    // Form Data
    // const [name, setName] = useState<string>("");
    // const [surname, setSurname] = useState<string>("");
    // const [email, setEmail] = useState<string>("");
    // const [country, setCountry] = useState<CountryType | null>(null);
    // const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("MALE");
    // const [born, setBorn] = useState<Date | null>(null);
    // const [password, setPassword] = useState<string>("");
    // const [passwordRepeatation, setPasswordRepeatation] = useState<string>("");
    // MOCKED
    const [name, setName] = useState<string>("Kacper");
    const [surname, setSurname] = useState<string>("Ksiazek");
    const [email, setEmail] = useState<string>("jebac_gorzen@gmail.com");
    const [country, setCountry] = useState<CountryType | null>({ code: "PL", label: "Poland", phone: "48" });
    const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("MALE");
    const [born, setBorn] = useState<Date | null>(new Date());
    const [password, setPassword] = useState<string>("jebac_gorzen123");
    const [passwordRepeatation, setPasswordRepeatation] = useState<string>("jebac_gorzen123");
    const [avatar, setAvatar] = useState<File | null>(null);
    // Auxiliary
    const buttonStyles = { my: 1 };
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
    //
    return (
        <Box className={bgIMGStyles.background} sx={{ backgroundPositionY: `` }}>
            <Image
                className={bgIMGStyles["bg-image"]} //
                src={backgroundImage}
                layout="fill"
                alt="background"
                objectFit="cover"
                objectPosition={`center ${50 - currentSlideIndex * 15}%`}
                priority={true}
                placeholder="blur"
                //
            ></Image>
            <Card className={styles.formCard}>
                <Stepper currentSlideIndex={currentSlideIndex}></Stepper>

                {(() => {
                    switch (currentSlideIndex) {
                        case 0:
                            return (
                                <PersonalData
                                    // Data
                                    name={{ value: name, setValue: setName }}
                                    surname={{ value: surname, setValue: setSurname }}
                                    gender={{ value: gender, setValue: setGender }}
                                    born={{ value: born, setValue: setBorn }}
                                    country={{ value: country, setValue: setCountry }}
                                    //
                                    buttonStyles={buttonStyles}
                                    currentSlideIndex={currentSlideIndex}
                                    updateSlideIndex={setCurrentSlideIndex}
                                ></PersonalData>
                            );
                        case 1:
                            return (
                                <Credentials
                                    // Data
                                    password={{ value: password, setValue: setPassword }}
                                    passwordRepeatation={{ value: passwordRepeatation, setValue: setPasswordRepeatation }}
                                    email={{ value: email, setValue: setEmail }}
                                    //
                                    buttonStyles={buttonStyles}
                                    currentSlideIndex={currentSlideIndex}
                                    updateSlideIndex={setCurrentSlideIndex}
                                ></Credentials>
                            );
                        case 2:
                            return (
                                <Avatar
                                    avatar={{ value: avatar, setValue: setAvatar }}
                                    //
                                    currentSlideIndex={currentSlideIndex}
                                    updateSlideIndex={setCurrentSlideIndex}
                                ></Avatar>
                            );
                        case 3:
                            return (
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
                                ></Upload>
                            );
                    }
                })()}
                <Divider sx={{ mt: 4, mb: 1 }}></Divider>
                <CardActions sx={{ justifyContent: "center", mb: 1 }}>
                    <Button>
                        <Link href="/login">
                            <a>Already have an account</a>
                        </Link>
                    </Button>
                    <Button>
                        <Link href="/">
                            <a>Main page</a>
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default Registration;
