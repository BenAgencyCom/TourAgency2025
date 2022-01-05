import { useState } from "react";
import stated from "@/utils/client/stated";
import dynamic from "next/dynamic";
import GuardedRoute from "@/utils/client/GuardedRoute";
// Types
import type { Continent } from "@prisma/client";
import type { FunctionComponent } from "react";
import type { CountryType } from "@/data/countries";
import type { DraggableDestinationContentField } from "@/@types/DestinationDescription";
import type { GetServerSideProps } from "next";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import Image from "next/Image";
import Stepper from "@/components/admin/create_destination/Stepper";
import GeneralInformation from "@/components/admin/create_destination/GeneralInformations";
import Thumbnail from "@/components/admin/create_destination/Thumbnail";
import Landmarks from "@/components/admin/create_destination/landmarks/Landmarks";
const Description = dynamic(() => import("@/components/admin/create_destination/description/Description"), { ssr: false });
// Styles
import bgIMGStyles from "@/sass/large_image_as_background.module.sass";
import backgroundImage from "@/public/images/admin/add_destination/bgc.jpg";
import styles from "@/sass/admin/create_destination.module.sass";

const CreateDestinatinon: FunctionComponent<{}> = () => {
    const [stepperIndex, setStepperIndex] = useState<number>(3);

    const [city, setCity] = useState<string>("Warsaw");
    const [country, setCountry] = useState<CountryType | null>({ code: "PL", label: "Poland", phone: "48" });
    const [continent, setContinent] = useState<Continent>("Europe");
    const [quickDescriptions, setQuickDescriptions] = useState<string>("Lorem ipsum – tekst składający się z łacińskich i quasi-łacińskich wyrazów, mający korzenie w klasycznej łacinie");
    const [population, setPopulation] = useState<string>("1 200 000");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [description, setDescription] = useState<DraggableDestinationContentField[]>([
        {
            id: "3",
            type: 2,
            src: null,
            url: "",
        },
        {
            id: "1",
            type: 0,
            header: "Lorem, ipsum dolor sit amet consectetur adipisicin",
        },
        {
            id: "2",
            type: 1,
            content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore illo quos minus sequi inventore, maxime vitae suscipit, rerum iure qui optio in numquam praesentium magni aliquid libero magnam, nulla vero. A, reiciendis! Non deserunt assumenda dolor! Sunt eius quae consequatur laborum ratione non explicabo quis, delectus totam assumenda sequi vel obcaecati beatae ipsum repudiandae quisquam rerum expedita nam quidem provident! Adipisci consequuntur nobis dicta deleniti rem, voluptatem cum dignissimos autem eius aspernatur similique ducimus distinctio laudantium ullam quibusdam est voluptates repellat accusantium! Quos non ea cum alias deleniti neque dolore? Ipsum obcaecati laborum incidunt eaque ratione neque facere aliquam, reprehenderit consectetur dicta expedita explicabo dignissimos? Vel illum, voluptatem accusamus laboriosam aut neque assumenda inventore incidunt, placeat vero id recusandae ipsam!`,
        },
    ]);

    const buttonStyles = { my: 1 };

    return (
        <Box className={bgIMGStyles.background} component="section">
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
                                country={stated<CountryType | null>(country, setCountry)}
                                city={stated<string>(city, setCity)}
                                continent={stated<Continent>(continent, setContinent)}
                                population={stated<string>(population, setPopulation)}
                                quickDescriptions={stated<string>(quickDescriptions, setQuickDescriptions)}
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
                                // Auxiliary
                                buttonStyles={buttonStyles}
                                stepperIndex={stated<number>(stepperIndex, setStepperIndex)}
                            ></Landmarks>
                        );
                    } else if (stepperIndex === 3) {
                        return (
                            <Description
                                description={stated<DraggableDestinationContentField[]>(description, setDescription)}
                                // Auxiliary
                                buttonStyles={buttonStyles}
                                stepperIndex={stated<number>(stepperIndex, setStepperIndex)}
                            ></Description>
                        );
                    }
                })()}
            </Box>
        </Box>
    );
};

export const getServerSideProps: GetServerSideProps = (ctx) => GuardedRoute("user", ctx);

export default CreateDestinatinon;
