import joi from "joi";
import { useState, useEffect } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StagedDataField";
import type { Continent } from "@prisma/client";
import type { CountryType } from "@/data/countries";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
// Other Components
import TextInput from "@/components/register/_formFields/TextInput";
import Select from "@/components/register/_formFields/Select";
import AutocompleteCountry from "@/components/register/_formFields/AutocompleteCountry";
import Image from "next/Image";
import BottomNavigation from "@/components/admin/create_destination/BottomNavigation";
import SectionHeader from "@/components/admin/create_destination/SectionHeader";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";
interface GeneralInformationInterface {
    city: StatedDataField<string>;
    country: StatedDataField<CountryType | null>;
    population: StatedDataField<string>;
    continent: StatedDataField<Continent>;
    quickDescriptions: StatedDataField<string>;
    // Auxiliary
    buttonStyles: Record<string, unknown>;
    stepperIndex: StatedDataField<number>;
}

const GeneralInformation: FunctionComponent<GeneralInformationInterface> = (props) => {
    const { city, country, population, continent, quickDescriptions, buttonStyles } = props;
    //
    // Validation
    //
    const [blockContinue, setBlockContinue] = useState<boolean>(true);
    const joiScheme = joi.object({
        city: joi.string().min(3).max(60).trim(),
        population: joi.number().min(0).max(1000000000),
        continent: joi.valid("Africa", "Antarctica", "Asia", "Australia_Oceania", "Europe", "North_America", "South_America"),
        quickDescriptions: joi.string().min(10).max(150),
        country: joi.object({
            code: joi.string().length(2),
            label: joi.string().max(60),
            phone: joi.string().max(7),
        }),
    });
    const test = () => {
        const { error } = joiScheme.validate({
            city: city.value,
            population: Number(population.value.replaceAll(" ", "")),
            country: country.value,
            continent: continent.value,
            quickDescriptions: quickDescriptions.value,
        });
        setBlockContinue(Boolean(error));
    };
    useEffect(test, [city, population, country, continent, quickDescriptions, joiScheme]);
    //
    //
    //
    const updatePopulation = (e: ChangeEvent<HTMLInputElement>) => {
        let res = "";
        e.target.value
            .replaceAll(" ", "")
            .split("")
            .reverse()
            .forEach((a, i) => (!(i % 3) ? (res += ` ${a}`) : (res += a)));
        population.setValue(res.split("").reverse().join("").trim());
        //
    };
    return (
        <Fade in={true}>
            <Box className={styles["section-content-wrapper"]} component="section">
                <SectionHeader text="General information"></SectionHeader>
                <TextField
                    label="Description" //
                    sx={{ width: "100%", ...buttonStyles }}
                    value={quickDescriptions.value}
                    onChange={(e: { target: { value: string } }) => quickDescriptions.setValue(e.target.value)}
                    multiline={true}
                    maxRows={2}
                    helperText={`${quickDescriptions.value.length}/128`}
                ></TextField>

                <Box className={styles["form-fields-wrap"]}>
                    <TextInput
                        label="City" //
                        value={city.value}
                        updateValue={city.setValue}
                        buttonStyles={buttonStyles}
                        sx={{ width: "60%" }}
                    ></TextInput>
                    <TextField
                        label="Population" //
                        value={population.value}
                        onChange={updatePopulation}
                        sx={{ width: "38%", ...buttonStyles }}
                    ></TextField>
                </Box>
                <Box className={styles["form-fields-wrap"]}>
                    <AutocompleteCountry
                        label="Country" //
                        value={country.value}
                        updateValue={country.setValue}
                        buttonStyles={{ ...buttonStyles, width: "60%" }}
                    ></AutocompleteCountry>
                    <Select
                        label="Continent" //
                        value={continent.value}
                        options={["Africa", "Antarctica", "Asia", "Australia_Oceania", "Europe", "North_America", "South_America"] as Continent[]}
                        updateValue={(val) => continent.setValue(val as Continent)}
                        buttonStyles={buttonStyles}
                        sx={{ width: "38%" }}
                    ></Select>
                </Box>
                <Box className={styles["form-fields-wrap"]} sx={{ flexGrow: 1, width: "100%", zIndex: -1 }}>
                    <Image src={`/images/continents/${continent.value}.png`} layout="fill" alt="continent"></Image>
                </Box>
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
