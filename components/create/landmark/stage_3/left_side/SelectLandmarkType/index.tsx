// Tools
import { GetLandmarkIcon } from "@/utils/client/getLandmarkIcon";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { LandmarkType } from "@prisma/client";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI components
import Tooltip from "@mui/material/Tooltip";
// Other components
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";
// Material UI Icons
import Surfing from "@mui/icons-material/Surfing";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import Label from "@/components/create/_utils/styled_components/Label";
import SingleLandmarkTypeTile from "./SingleLandmarkTypeTile";

interface SelectLandmarkTypeProps {
    landmarkType: StatedDataField<LandmarkType>;
    sx?: SxProps;
}

const SelectLandmarkType: FunctionComponent<SelectLandmarkTypeProps> = (props) => {
    const options: { label: string; value: LandmarkType }[] = [
        { label: "Antique", value: "ANTIQUE" },
        { label: "Art", value: "ART" },
        { label: "Building", value: "BUILDING" },
        { label: "Monument", value: "MONUMENT" },
        { label: "Museum", value: "MUSEUM" },
        { label: "Nature", value: "NATURE" },
        { label: "Restaurant", value: "RESTAURANT" },
    ];

    return (
        <FlexBox sx={props.sx} id="select-landmark-type-field" column>
            <Label>Type</Label>

            <SelectWithIcon
                icon={<Surfing />} //
                onChange={(e: any) => props.landmarkType.setValue(e.target.value)}
                value={props.landmarkType.value}
                options={
                    [
                        { label: "Antique", value: "ANTIQUE" },
                        { label: "Art", value: "ART" },
                        { label: "Building", value: "BUILDING" },
                        { label: "Monument", value: "MONUMENT" },
                        { label: "Museum", value: "MUSEUM" },
                        { label: "Nature", value: "NATURE" },
                        { label: "Restaurant", value: "RESTAURANT" },
                    ] as { label: string; value: LandmarkType }[]
                }
                sx={{ width: "100%", margin: "10px 0", height: "52px" }}
            ></SelectWithIcon>

            <FlexBox sx={{ width: "100%", flexWrap: "wrap" }}>
                {options.map((item, index) => {
                    return (
                        <Tooltip title={item.label} key={item.value} placement="bottom">
                            <SingleLandmarkTypeTile className={item.value === props.landmarkType.value ? "selected" : ""} onClick={() => props.landmarkType.setValue(item.value)}>
                                {GetLandmarkIcon(item.value)}
                            </SingleLandmarkTypeTile>
                        </Tooltip>
                    );
                })}
            </FlexBox>
        </FlexBox>
    );
};

export default SelectLandmarkType;
