import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface SelectFromEnumProps {
    enum: Record<number | string, unknown>;
    value: StatedDataField<any>;
    props?: unknown;
    excludeFromEnum?: unknown[];
}

interface Data {
    key: string;
    value: string | number;
}

const SelectFromEnum: FunctionComponent<SelectFromEnumProps> = (props) => {
    const keys = Object.keys(props.enum).filter((el) => isNaN(el as any));
    let data: Data[] = [];
    keys.forEach((key) => data.push({ key: key, value: props.enum[key] as Data["value"] }));

    if (props.excludeFromEnum) {
        data = data.filter(({ value }) => !props.excludeFromEnum?.includes(value));
    }
    const onChange = (e: ChangeEvent<HTMLSelectElement>) => props.value.setValue(e.target.value);

    return (
        <Select
            value={props.value.value} //
            onChange={(e: any) => onChange(e)}
            {...props.props}
        >
            {data.map(({ key, value }) => {
                return (
                    <MenuItem value={value} key={key}>
                        {key}
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export default SelectFromEnum;
