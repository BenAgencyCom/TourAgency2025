// Tools
// Types
import { FieldType } from "@/@types/Description";
import type { FunctionComponent } from "react";
// Material UI Icons
import LibraryBooks from "@mui/icons-material/LibraryBooks";
import Celebration from "@mui/icons-material/Celebration";
import Panorama from "@mui/icons-material/Panorama";
import CallSplit from "@mui/icons-material/CallSplit";

interface DestinationFieldIconProps {
    fieldType: FieldType;
}

const DestinationFieldIcon: FunctionComponent<DestinationFieldIconProps> = (props) => {
    if (props.fieldType === FieldType.HEADER) return <Celebration />;
    else if (props.fieldType === FieldType.PARAGRAPH) return <LibraryBooks />;
    else if (props.fieldType === FieldType.IMAGE) return <Panorama />;
    return <CallSplit />;
};

export default DestinationFieldIcon;
