// Tools
import CREATE_LANDMARK_RESTRICTIONS from "@/utils/restrictions/createLandmark";
import useCreateLandmarkContext from "@/components/create/landmark/hooks/useCreateLandmarkContext";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
// Material UI Icons
import Sailing from "@mui/icons-material/Sailing";
// Other components
import InputWithIcon from "@/components/_utils/styled/InputWithIcon";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import Label from "@/components/create/_utils/styled_components/Label";

interface ShortDescriptionProps {
    sx?: SxProps;
}

const ShortDescription: FunctionComponent<ShortDescriptionProps> = (props) => {
    const { shortDescription } = useCreateLandmarkContext();

    return (
        <FlexBox column id="short-description-field" sx={props.sx}>
            <Label>Short description</Label>
            <InputWithIcon
                icon={<Sailing />} //
                value={shortDescription.value}
                onChange={(e: any) => shortDescription.setValue(e.target.value)}
                multiline
                rows={3}
                placeholder="Giva a short demystification..."
                sx={{ width: "100%" }}
                lengthNotification={{
                    restrictions: CREATE_LANDMARK_RESTRICTIONS.shortDescription,
                    fieldName: "short description",
                }}
            ></InputWithIcon>
        </FlexBox>
    );
};

export default ShortDescription;
