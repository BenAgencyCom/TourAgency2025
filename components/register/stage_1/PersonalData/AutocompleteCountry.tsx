// Tools
import { countries } from "@/data/countries";
import type { FunctionComponent } from "react";
// Types
import type { SxProps } from "@mui/system";
import type { CountryType } from "@/data/countries";
// Material UI Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";

interface AutocompleteProps {
    // Properties
    label: string;
    value: CountryType | null;
    _cypressTag?: string;
    sx?: SxProps;
    error?: boolean;
    // Methods
    updateValue: (value: CountryType | null) => void;
}
const AutocompleteCountry: FunctionComponent<AutocompleteProps> = (props) => {
    return (
        <Autocomplete
            autoHighlight //
            options={countries}
            getOptionLabel={(option: CountryType) => option.label}
            onChange={(_: any, newValue: CountryType | null) => props.updateValue(newValue)}
            value={props.value}
            isOptionEqualToValue={(option: CountryType, value: CountryType) => option.label === value.label && option.code === value.code && option.phone === value.phone}
            sx={props.sx}
            renderOption={(optionProps, option: CountryType) => {
                return (
                    <Box
                        component="li" //
                        {...optionProps}
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        data-cy={`${props._cypressTag}-${option.label}`}
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
                            "data-cy": props._cypressTag,
                        }}
                        error={props.error}
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
