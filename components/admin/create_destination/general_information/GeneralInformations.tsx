import { useState, useEffect } from "react";
import GeneralInformationSchema from "@/validators/helpers/create_destination/generalInformationJoiSchema";
import restrictions from "@/utils/restrictions/createDestination";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StagedDataField";
import type { Continent } from "@prisma/client";
import type { CountryType } from "@/data/countries";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Other Components
import QuickDescription from "./QuickDescription";
import Population from "./Population";
import City from "./City";

import Select from "@/components/register/_formFields/Select";
import AutocompleteCountry from "@/components/register/_formFields/AutocompleteCountry";
import Image from "next/Image";
import BottomNavigation from "@/components/admin/create_destination/BottomNavigation";
import SectionHeader from "@/components/admin/create_destination/SectionHeader";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";
// Styled components
const FormFieldsWrap = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
});

interface GeneralInformationInterface {
    city: StatedDataField<string>;
    country: StatedDataField<CountryType | null>;
    population: StatedDataField<string>;
    continent: StatedDataField<Continent>;
    quickDescription: StatedDataField<string>;
    // Auxiliary
    buttonStyles: Record<string, unknown>;
    stepperIndex: StatedDataField<number>;
}

const GeneralInformation: FunctionComponent<GeneralInformationInterface> = (props) => {
    const { city, country, population, continent, quickDescription, buttonStyles } = props;
    //
    // Validation
    //
    const [blockContinue, setBlockContinue] = useState<boolean>(true);

    const test = () => {
        const { error } = GeneralInformationSchema.validate({
            city: city.value,
            population: Number(population.value.replaceAll(" ", "")),
            country: country.value,
            continent: continent.value,
            quickDescription: quickDescription.value,
        });
        setBlockContinue(Boolean(error));
    };
    useEffect(test, [city, population, country, continent, quickDescription]);
    //
    //
    //
    return (
        <Fade in={true}>
            <Box className={styles["section-content-wrapper"]} component="section">
                <SectionHeader text="General information"></SectionHeader>

                <QuickDescription
                    quickDescription={quickDescription} //
                    restrictions={restrictions.quickDescription}
                ></QuickDescription>

                <FormFieldsWrap>
                    <City
                        city={city} //
                        restrictions={restrictions.city}
                        sx={{ width: "60%" }}
                    ></City>
                    <Population
                        population={population} //
                        restrictions={restrictions.population}
                        sx={{ width: "38%" }}
                    ></Population>
                </FormFieldsWrap>

                <FormFieldsWrap>
                    <AutocompleteCountry
                        label="Country" //
                        value={country.value}
                        updateValue={country.setValue}
                        buttonStyles={{ width: "60%" }}
                    ></AutocompleteCountry>
                    <Select
                        label="Continent" //
                        value={continent.value}
                        options={
                            [
                                "Africa", //
                                "Antarctica",
                                "Asia",
                                "Australia_Oceania",
                                "Europe",
                                "North_America",
                                "South_America",
                            ] as Continent[]
                        }
                        updateValue={(val) => continent.setValue(val as Continent)}
                        sx={{ width: "38%" }}
                    ></Select>
                </FormFieldsWrap>

                <FormFieldsWrap sx={{ flexGrow: 1, width: "100%", zIndex: -1, mt: 2 }}>
                    <Image
                        src={`/images/continents/${continent.value}.png`} //
                        placeholder="blur"
                        blurDataURL="/images/continents/blank.png"
                        layout="fill"
                        alt="continent"
                    ></Image>
                </FormFieldsWrap>

                <BottomNavigation
                    blockContinue={blockContinue} //
                    currentSlideIndex={props.stepperIndex.value}
                    updateSlideIndex={props.stepperIndex.setValue}
                ></BottomNavigation>
            </Box>
        </Fade>
    );
};

export default GeneralInformation;
