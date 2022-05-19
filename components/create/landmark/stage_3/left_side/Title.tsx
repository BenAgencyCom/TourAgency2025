// Tools
import CREATE_LANDMARK_RESTRICTIONS from "@/utils/restrictions/createLandmark";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Icons
import Anchor from "@mui/icons-material/Anchor";
// Other components
import InputWithIcon from "@/components/_utils/styled/InputWithIcon";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import Label from "@/components/create/_utils/forms/Label";

interface TitleProps {
    title: StatedDataField<string>;
    sx?: SxProps;
}

const Title: FunctionComponent<TitleProps> = (props) => {
    return (
        <FlexBox column id="title-field" sx={props.sx}>
            <Label>Title</Label>
            <InputWithIcon
                icon={<Anchor />} //
                value={props.title.value}
                onChange={(e: any) => props.title.setValue(e.target.value)}
                lengthNotification={{
                    restrictions: CREATE_LANDMARK_RESTRICTIONS.title,
                    fieldName: "title",
                }}
                sx={{ width: "100%" }}
                placeholder="The name of the landmark..."
            ></InputWithIcon>
        </FlexBox>
    );
};

export default Title;
