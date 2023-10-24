import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import restrictions from "@/utils/restrictions/createDestination_OLD";
import GeneralInformationSchema from "@/validators/helpers/create_destination/generalInformationJoiSchema";
// Types
import type { FunctionComponent } from "react";
import type { Continent } from "@prisma/client";
import type { CountryType } from "@/data/countries";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import CreateDestinationSingleStep from "@/components/admin/create_destination/_utils/layout/CreateDestinationSingleStep";
import QuickDescription from "./QuickDescription";
import Population from "./Population";
import City from "./City";
import Select from "@/components/register/stage_1/PersonalData/Select";
import AutocompleteCountry from "@/components/register/stage_1/PersonalData/AutocompleteCountry";
import Image from "next/image";
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
    stepperIndex: StatedDataField<number>;
}

const GeneralInformation: FunctionComponent<GeneralInformationInterface> = (props) => {
    const { city, country, population, continent, quickDescription } = props;
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
        <CreateDestinationSingleStep
            stepperIndex={props.stepperIndex} //
            header="General Information"
            blockGoingForward={blockContinue}
        >
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
                    _cypressTag="country"
                    sx={{ width: "60%" }}
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
        </CreateDestinationSingleStep>
    );
};

export default GeneralInformation;
