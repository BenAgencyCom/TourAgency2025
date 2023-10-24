import axios from "axios";
import { useState } from "react";
import dynamic from "next/dynamic";
import stated from "@/utils/client/stated";
import GuardedRoute from "@/utils/client/GuardedRoute";
// Types
import type { GetServerSideProps } from "next";
import type { FunctionComponent } from "react";
import type { Continent } from "@prisma/client";
import { FieldType } from "@/@types/Description";
import type { ImageContentField } from "@/@types/Description";
import type { Landmark } from "@/@types/pages/admin/create_destination/Landmark";
import type { CountryType } from "@/data/countries";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import Head from "next/head";
import Image from "next/image";
import Loading from "@/components/_utils/Loading";
import Stepper from "@/components/admin/create_destination/Stepper";
const Thumbnail = dynamic(() => import("@/components/admin/create_destination/thumbnail/Thumbnail"), { loading: () => <Loading /> });
const Landmarks = dynamic(() => import("@/components/admin/create_destination/landmarks/Landmarks"), { loading: () => <Loading /> });
const Description = dynamic(() => import("@/components/admin/create_destination/description/Description"), { ssr: false, loading: () => <Loading /> });
const GeneralInformation = dynamic(() => import("@/components/admin/create_destination/general_information/GeneralInformations"), { loading: () => <Loading /> });
const Confirmation = dynamic(() => import("@/components/admin/create_destination/confirmation/Confirmation"), { loading: () => <Loading /> });
// Upload Results:
const Error = dynamic(() => import("@/components/admin/create_destination/confirmation/Error"), { loading: () => <Loading /> });
const Success = dynamic(() => import("@/components/admin/create_destination/confirmation/Success"), { loading: () => <Loading /> });
// Styles
import styles from "@/sass/admin/create_destination.module.sass";
import bgIMGStyles from "@/sass/large_image_as_background.module.sass";
import backgroundImage from "@/public/images/admin/add_destination/bgc.jpg";
// Redux
import { useAppSelector } from "@/hooks/useRedux";

const CreateDestinatinon: FunctionComponent<{}> = () => {
    const [stepperIndex, setStepperIndex] = useState<number>(0);
    const [thumbnailURL, setThumbnailUrl] = useState<string | null>(null);
    const [requestResult, setRequestResult] = useState<"POSITIVE" | "NEGATIVE" | "PENDING" | null>(null);
    const [slug, setSlug] = useState<string>("");

    const description = useAppSelector((state) => state.description.list);
    const landmarks = useAppSelector((state) => state.landmarks.list);

    const [city, setCity] = useState<string>("Warsaw");
    const [country, setCountry] = useState<CountryType | null>({ code: "PL", label: "Poland", phone: "48" });
    const [continent, setContinent] = useState<Continent>("Europe");
    const [quickDescription, setQuickDescription] = useState<string>("Lorem ipsum – tekst składający się z łacińskich i quasi-łacińskich wyrazów, mający korzenie w klasycznej łacinie");
    const [population, setPopulation] = useState<string>("1 200 000");
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const makeAPIRequest = async () => {
        setRequestResult("PENDING");
        const body = new FormData();
        // Images
        body.append("thumbnail", thumbnail as File);
        // Data
        body.append("city", city);
        body.append("continent", continent);
        body.append("country", JSON.stringify(country));
        body.append("quickDescription", quickDescription);
        body.append("population", population.replaceAll(" ", ""));

        let descriptionCounter = 0;
        body.append(
            "description",
            JSON.stringify(
                description.map((target) => {
                    const copy = Object.assign({}, target.data);
                    // HANDLE DESCRIPTION'S IMAGES
                    const handleImageField = (field: ImageContentField): ImageContentField => {
                        const fieldsCopy = Object.assign({}, field);
                        const imageName = `description_${++descriptionCounter}`;
                        body.append(imageName, fieldsCopy.src as File);
                        fieldsCopy.url = imageName;
                        fieldsCopy.src = null;
                        return fieldsCopy;
                    };

                    if (copy.type === FieldType.IMAGE) return handleImageField(copy);
                    else if (copy.type === FieldType.SPLITTED) {
                        if (copy.left.type === FieldType.IMAGE) copy.left = handleImageField(copy.left);
                        if (copy.right.type === FieldType.IMAGE) copy.right = handleImageField(copy.right);
                    }
                    return copy;
                })
            )
        );
        body.append(
            "landmarks",
            JSON.stringify(
                landmarks.map((target, index) => {
                    const copy: Landmark = Object.assign({}, target.data);
                    // HANDLE LANDMARK'S IMAGES
                    const imageName = `landmark_${index + 1}`;
                    body.append(imageName, copy.picture as File);
                    copy.pictureURL = imageName;
                    return copy;
                })
            )
        );

        try {
            const { data } = await axios.post("/api/destination/create", body);
            setSlug(data.slug);
            setRequestResult("POSITIVE");
        } catch (e) {
            setRequestResult("NEGATIVE");
        }
    };

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
                    {(() => {
                        if (requestResult === "NEGATIVE") {
                            return (
                                <Error
                                    goBack={() => {
                                        setRequestResult(null);
                                        setStepperIndex(0);
                                    }}
                                ></Error>
                            );
                        } else if (requestResult === "POSITIVE") {
                            return <Success slug={slug}></Success>;
                        }
                    })()}
                    {/*  */}
                    <Stepper activeStep={stepperIndex}></Stepper>
                    {/*  */}
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
                                    stepperIndex={stated<number>(stepperIndex, setStepperIndex)}
                                ></GeneralInformation>
                            );
                        } else if (stepperIndex === 1) {
                            return (
                                <Thumbnail
                                    thumbnail={{ value: thumbnail, setValue: setThumbnail }}
                                    url={stated(thumbnailURL, setThumbnailUrl)}
                                    // Auxiliary
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
                                    stepperIndex={stated<number>(stepperIndex, setStepperIndex)} //
                                ></Description>
                            );
                        } else if (stepperIndex === 4) {
                            return (
                                <Confirmation
                                    makeAPIRequest={makeAPIRequest} //
                                    isPending={requestResult === "PENDING"}
                                    stepperIndex={stated<number>(stepperIndex, setStepperIndex)}
                                ></Confirmation>
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
