// Tools
// Types
import type { FunctionComponent } from "react";
// Other Components
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";
import LineIntroAnimation from "@/components/_utils/LineIntroAnimation";

interface ExtraSelectsProps {
    extraSelects?: any[];
    state: Record<string, any>;
    disabled?: boolean;
    lineAnimationColor: "primary" | "text" | "background" | "paperDefault" | "paperLight";

    update: (prop: string, e: any) => void;
}

const ExtraSelects: FunctionComponent<ExtraSelectsProps> = (props) => {
    return (
        <>
            {props.extraSelects &&
                props.extraSelects.map((item, index) => {
                    const { key, options, icon, sx, defaultValue } = item;
                    return (
                        <LineIntroAnimation
                            key={key} //
                            in={true}
                            intro="left"
                            outro={index % 2 ? "top" : "bottom"}
                            color={props.lineAnimationColor}
                            delay={150 + index * 50}
                        >
                            <SelectWithIcon
                                options={options} //
                                value={props.state[key]}
                                icon={icon}
                                sx={sx}
                                onChange={(e) => props.update(key, e)}
                                defaultValue={defaultValue}
                                disabled={props.disabled}
                            ></SelectWithIcon>
                        </LineIntroAnimation>
                    );
                })}
        </>
    );
};

export default ExtraSelects;
