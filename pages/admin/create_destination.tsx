import { useState } from "react";
import dynamic from "next/dynamic";
import stated from "@/utils/client/stated";
import GuardedRoute from "@/utils/client/GuardedRoute";
// Types
import type { GetServerSideProps } from "next";
import type { FunctionComponent } from "react";
import type { Continent } from "@prisma/client";
import type { CountryType } from "@/data/countries";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import Head from "next/Head";
import Image from "next/Image";
import Loading from "@/components/_utils/Loading";
import Stepper from "@/components/admin/create_destination/Stepper";
const Thumbnail = dynamic(() => import("@/components/admin/create_destination/Thumbnail"), { loading: () => <Loading /> });
const Landmarks = dynamic(() => import("@/components/admin/create_destination/landmarks/Landmarks"), { loading: () => <Loading /> });
const Description = dynamic(() => import("@/components/admin/create_destination/description/Description"), { ssr: false, loading: () => <Loading /> });
const GeneralInformation = dynamic(() => import("@/components/admin/create_destination/general_information/GeneralInformations"), { loading: () => <Loading /> });
// Styles
import styles from "@/sass/admin/create_destination.module.sass";
import bgIMGStyles from "@/sass/large_image_as_background.module.sass";
import backgroundImage from "@/public/images/admin/add_destination/bgc.jpg";

const CreateDestinatinon: FunctionComponent<{}> = () => {
    const [stepperIndex, setStepperIndex] = useState<number>(3);

    const [city, setCity] = useState<string>("Warsaw");
    const [country, setCountry] = useState<CountryType | null>({ code: "PL", label: "Poland", phone: "48" });
    const [continent, setContinent] = useState<Continent>("Europe");
    const [quickDescription, setQuickDescription] = useState<string>("Lorem ipsum – tekst składający się z łacińskich i quasi-łacińskich wyrazów, mający korzenie w klasycznej łacinie");
    const [population, setPopulation] = useState<string>("1 200 000");
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const buttonStyles = { my: 1 };

    return (
        <>
            <Head>
                <title>ADMIN | Create destination</title>
            </Head>
            <Box className={bgIMGStyles.background} component="section">
                <Image
                    className={bgIMGStyles["bg-image"]} //
                    src={backgroundImage}
                    layout="fill"
                    alt="background"
                    objectFit="cover"
                    objectPosition="center"
                    placeholder="blur"
                ></Image>
                {/* CONTENT */}
                <Box className={styles.wrapper}>
                    <Stepper activeStep={stepperIndex}></Stepper>
                    {(() => {
                        if (stepperIndex === 0) {
                            return (
                                <GeneralInformation
                                    country={stated<CountryType | null>(country, setCountry)}
                                    city={stated<string>(city, setCity)}
                                    continent={stated<Continent>(continent, setContinent)}
                                    population={stated<string>(population, setPopulation)}
                                    quickDescription={stated<string>(quickDescription, setQuickDescription)}
                                    // Auxiliary
                                    buttonStyles={buttonStyles}
                                    stepperIndex={stated<number>(stepperIndex, setStepperIndex)}
                                ></GeneralInformation>
                            );
                        } else if (stepperIndex === 1) {
                            return (
                                <Thumbnail
                                    thumbnail={{ value: thumbnail, setValue: setThumbnail }}
                                    // Auxiliary
                                    buttonStyles={buttonStyles}
                                    stepperIndex={stated<number>(stepperIndex, setStepperIndex)}
                                ></Thumbnail>
                            );
                        } else if (stepperIndex === 2) {
                            return (
                                <Landmarks
                                    stepperIndex={stated<number>(stepperIndex, setStepperIndex)} //
                                ></Landmarks>
                            );
                        } else if (stepperIndex === 3) {
                            return (
                                <Description
                                    buttonStyles={buttonStyles} //
                                    stepperIndex={stated<number>(stepperIndex, setStepperIndex)}
                                ></Description>
                            );
                        }
                    })()}
                </Box>
            </Box>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => await GuardedRoute("admin", ctx);

export default CreateDestinatinon;
