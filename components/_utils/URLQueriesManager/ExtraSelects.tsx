// Tools
// Types
import type { FunctionComponent } from "react";
// Other Components
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";

interface ExtraSelectsProps {
    extraSelects?: any[];
    update: (prop: string, e: any) => void;
    state: Record<string, any>;
}

const ExtraSelects: FunctionComponent<ExtraSelectsProps> = (props) => {
    return (
        <>
            {props.extraSelects &&
                props.extraSelects.map((item, index) => {
                    const { key, options, icon, sx } = item;
                    return (
                        <SelectWithIcon
                            key={key} //
                            options={options}
                            value={props.state[key]}
                            icon={icon}
                            sx={sx}
                            onChange={(e) => props.update(key, e)}
                        ></SelectWithIcon>
                    );
                })}
        </>
    );
};

export default ExtraSelects;
