import type { FunctionComponent } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "@/data/countries";
import type { CountryType } from "@/data/countries";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
interface AutocompleteProps {
    // Properties
    label: string;
    value: CountryType | null;
    buttonStyles: Record<string, any>;
    // Methods
    updateValue: (value: CountryType | null) => void;
}
const AutocompleteCountry: FunctionComponent<AutocompleteProps> = (props) => {
    return (
        <Autocomplete
            autoHighlight //
            options={countries}
            getOptionLabel={(option: CountryType) => option.label}
            sx={props.buttonStyles}
            onChange={(_: any, newValue: CountryType | null) => props.updateValue(newValue)}
            value={props.value}
            isOptionEqualToValue={(option: CountryType, value: CountryType) => option.label === value.label && option.code === value.code && option.phone === value.phone}
            renderOption={(props, option: CountryType) => {
                return (
                    <Box
                        component="li" //
                        {...props}
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            loading="lazy" //
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            alt=""
                        />
                        {option.label} ({option.code}) +{option.phone}
                    </Box>
                );
            }}
            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        label={props.label}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                        }}
                        InputProps={{
                            ...params.InputProps,
                            ...{
                                startAdornment: (() => {
                                    if (!props.value) return null;
                                    return (
                                        <InputAdornment position="end">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                loading="lazy" //
                                                width="20"
                                                src={`https://flagcdn.com/w20/${props.value.code.toLowerCase()}.png`}
                                                alt=""
                                            />
                                        </InputAdornment>
                                    );
                                })(),
                            },
                        }}
                    ></TextField>
                );
            }}
        ></Autocomplete>
    );
};

export default AutocompleteCountry;
