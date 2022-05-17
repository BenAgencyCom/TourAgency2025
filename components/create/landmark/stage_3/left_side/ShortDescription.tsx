// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Icons
import Sailing from "@mui/icons-material/Sailing";
// Other components
import InputWithIcon from "@/components/_utils/styled/InputWithIcon";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import Label from "@/components/create/_utils/forms/Label";

interface ShortDescriptionProps {
    shortDescription: StatedDataField<string>;
    sx?: SxProps;
}

const ShortDescription: FunctionComponent<ShortDescriptionProps> = (props) => {
    return (
        <FlexBox column id="short-description-field" sx={props.sx}>
            <Label>Short description</Label>
            <InputWithIcon
                icon={<Sailing />} //
                value={props.shortDescription.value}
                onChange={(e: any) => props.shortDescription.setValue(e.target.value)}
                maxLength={150}
                multiline
                minRows={3}
                placeholder="Giva a short demystification..."
                sx={{ width: "100%" }}
            ></InputWithIcon>
        </FlexBox>
    );
};

export default ShortDescription;
