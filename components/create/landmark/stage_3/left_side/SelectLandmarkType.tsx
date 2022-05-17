// Tools
import { styled, alpha } from "@mui/system";
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
import Label from "@/components/create/_utils/forms/Label";

const Field = styled("div")(({ theme }) => ({
    width: "90px",
    height: "90px",
    marginRight: "10px",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3rem",
    borderRadius: "5px",
    transition: "all .3s ease-in-out",
    svg: {
        fontSize: "inherit",
    },
    cursor: "pointer",
    "&:hover": {
        background: alpha(theme.palette.text.primary, 0.1),
    },
    "&.selected": {
        background: theme.palette.text.primary,
        color: "#fff",
    },
}));
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
        <FlexBox column sx={props.sx} id="select-landmark-type-field">
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
                sx={{ width: "100%", margin: "10px 0", height: "61px" }}
            ></SelectWithIcon>

            <FlexBox sx={{ width: "100%", flexWrap: "wrap" }}>
                {options.map((item, index) => {
                    return (
                        <Tooltip title={item.label} key={item.value} placement="bottom">
                            <Field className={item.value === props.landmarkType.value ? "selected" : ""} onClick={() => props.landmarkType.setValue(item.value)}>
                                {GetLandmarkIcon(item.value)}
                            </Field>
                        </Tooltip>
                    );
                })}
            </FlexBox>
        </FlexBox>
    );
};

export default SelectLandmarkType;
