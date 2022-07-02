// Tools
import { useState, useEffect } from "react";
// Types
import type { SelectProps, SelectExtraOrderOption } from "./@types";
import type { FunctionComponent, ChangeEvent } from "react";
// Other components
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";

interface SelectOrderProps extends Omit<SelectProps, "options"> {
    options: SelectExtraOrderOption[];
    value: any;
    disabled?: boolean;
    update: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectOrder: FunctionComponent<SelectOrderProps> = (props) => {
    const { options, value, sx, icon, defaultValue } = props;
    const [compounded, setCompoundedValue] = useState<string>("");

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.update(e);
    };

    useEffect(() => {
        const newValue = (options.find((target) => target.value == props.value) as SelectExtraOrderOption)["data-compounded-value"];
        setCompoundedValue(newValue);
    }, [props.value, options]);

    return (
        <SelectWithIcon
            id="select-order" //
            options={options}
            value={value}
            icon={icon}
            sx={sx}
            data-compounded-value={compounded}
            onChange={(e) => onChange(e as any)}
            defaultValue={defaultValue}
            disabled={props.disabled}
        ></SelectWithIcon>
    );
};

export default SelectOrder;
