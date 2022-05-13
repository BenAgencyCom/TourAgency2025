// Tools
import { validateLength } from "@/utils/client/lenghRestrictionHelpers";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { Restriction } from "@/@types/Restriction";
// Material UI Components
import TextField from "@mui/material/TextField";

interface PopulationProps {
    restrictions: Restriction;
    population: StatedDataField<string>;
    sx?: Record<any, unknown>;
}

const Population: FunctionComponent<PopulationProps> = (props) => {
    const { population, restrictions } = props;

    const updatePopulation = (e: ChangeEvent<HTMLInputElement>) => {
        // Ensure that latest character was number
        const length = e.target.value.length;
        const latestElement = e.target.value[length - 1] as any;
        if (latestElement !== undefined && isNaN(latestElement)) {
            e.target.value = e.target.value.slice(0, length - 2);
        } else {
            let res = "";
            e.target.value
                .replaceAll(" ", "")
                .split("")
                .reverse()
                .forEach((a, i) => (!(i % 3) ? (res += ` ${a}`) : (res += a))); // Add space every third character
            population.setValue(res.split("").reverse().join("").trim());
        }
        //
    };

    /**
     * Returns `true` if any error occurred
     */
    const validatePopulation = (): boolean => {
        const { value } = population;
        const valueToValidate = value.replaceAll ? value.replaceAll(" ", "") : value;

        return validateLength(Number(valueToValidate), restrictions, true);
    };

    return (
        <TextField
            label="Population" //
            value={population.value}
            onChange={updatePopulation}
            sx={props.sx ? props.sx : {}}
            error={validatePopulation()}
        ></TextField>
    );
};

export default Population;
