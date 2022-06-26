// Tools
import { GetLandmarkIcon } from "@/utils/client/getLandmarkIcon";
import useCreateLandmarkContext from "@/components/create/landmark/hooks/useCreateLandmarkContext";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { LandmarkType } from "@prisma/client";
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
    sx?: SxProps;
}

const SelectLandmarkType: FunctionComponent<SelectLandmarkTypeProps> = (props) => {
    const { landmarkType } = useCreateLandmarkContext();

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
                onChange={(e: any) => landmarkType.setValue(e.target.value)}
                value={landmarkType.value}
                options={options as { label: string; value: LandmarkType }[]}
                sx={{ width: "100%", margin: "10px 0", height: "52px" }}
            ></SelectWithIcon>

            <FlexBox sx={{ width: "100%", flexWrap: "wrap" }} className="tiles-wrapper">
                {options.map((item, index) => {
                    return (
                        <Tooltip title={item.label} key={item.value} placement="bottom">
                            <SingleLandmarkTypeTile
                                className={[
                                    item.value === landmarkType.value ? "selected" : "", //
                                    "single-landmark-type",
                                ].join(" ")} //
                                onClick={() => landmarkType.setValue(item.value)}
                            >
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
