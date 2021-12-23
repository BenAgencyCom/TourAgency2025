import { useState } from "react";
// Types
import type { Continent } from "@prisma/client";
import type { FunctionComponent } from "react";
import type { CountryType } from "@/data/countries";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import Image from "next/Image";
import Stepper from "@/components/admin/create_destination/Stepper";
import GeneralInformation from "@/components/admin/create_destination/GeneralInformations";
import Thumbnail from "@/components/admin/create_destination/Thumbnail";
import Landmarks from "@/components/admin/create_destination/landmarks/Landmarks";
// Styles
import bgIMGStyles from "@/sass/large_image_as_background.module.sass";
import backgroundImage from "@/public/images/admin/add_destination/bgc.jpg";
import styles from "@/sass/admin/create_destination.module.sass";

const CreateDestinatinon: FunctionComponent<{}> = () => {
    const [stepperIndex, setStepperIndex] = useState<number>(2);

    const [city, setCity] = useState<string>("Warsaw");
    const [country, setCountry] = useState<CountryType | null>({ code: "PL", label: "Poland", phone: "48" });
    const [continent, setContinent] = useState<Continent>("Europe");
    const [quickDescriptions, setQuickDescriptions] = useState<string>("Lorem ipsum – tekst składający się z łacińskich i quasi-łacińskich wyrazów, mający korzenie w klasycznej łacinie");
    const [population, setPopulation] = useState<string>("1 200 000");
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const buttonStyles = { my: 1 };

    return (
        <Box className={bgIMGStyles.background}>
            <Image
                className={bgIMGStyles["bg-image"]} //
                src={backgroundImage}
                layout="fill"
                alt="background"
                objectFit="cover"
                objectPosition="center"
                priority={true}
                placeholder="blur"
            ></Image>
            {/* CONTENT */}
            <Box className={styles.wrapper}>
                <Stepper activeStep={stepperIndex}></Stepper>
                {(() => {
                    if (stepperIndex === 0) {
                        return (
                            <GeneralInformation
                                country={{ value: country, setValue: setCountry }}
                                city={{ value: city, setValue: setCity }}
                                continent={{ value: continent, setValue: setContinent }}
                                population={{ value: population, setValue: setPopulation }}
                                quickDescriptions={{ value: quickDescriptions, setValue: setQuickDescriptions }}
                                // Auxiliary
                                buttonStyles={buttonStyles}
                                stepperIndex={{ value: stepperIndex, setValue: setStepperIndex }}
                            ></GeneralInformation>
                        );
                    }
                    if (stepperIndex === 1) {
                        return (
                            <Thumbnail
                                thumbnail={{ value: thumbnail, setValue: setThumbnail }}
                                // Auxiliary
                                buttonStyles={buttonStyles}
                                stepperIndex={{ value: stepperIndex, setValue: setStepperIndex }}
                            ></Thumbnail>
                        );
                    }
                    if (stepperIndex === 2) {
                        return (
                            <Landmarks
                                // Auxiliary
                                buttonStyles={buttonStyles}
                                stepperIndex={{ value: stepperIndex, setValue: setStepperIndex }}
                            ></Landmarks>
                        );
                    }
                })()}
            </Box>
        </Box>
    );
};

export default CreateDestinatinon;
