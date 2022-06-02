// Tools
import { styled } from "@mui/system";
// Types
import { ListItem } from "@/@types/redux";
import type { Restriction } from "@/@types/Restriction";
import type { FunctionComponent } from "react";
import type { SplittedContentField } from "@/@types/Description";
// Material UI Icons
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
// Other components
import SplittedSubfield from "./SplittedSubfield";
// Styled components
const SplittedContentFieldBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
});

interface SplittedBodyProps {
    field: ListItem<SplittedContentField>;
    restrictions: Restriction;
    isDragging: boolean;
}

const SplittedBody: FunctionComponent<SplittedBodyProps> = (props) => {
    const updateSubField = (subfield: "left" | "right", data: SplittedContentField[typeof subfield]) => {
        props.field.changeProperty(subfield, data);
    };

    return (
        <SplittedContentFieldBox className="splitted-field">
            <SplittedSubfield
                data={props.field.data["left"]} //
                updateSubField={(data: SplittedContentField["left"]) => updateSubField("left", data)}
                subFieldIndex={0}
                isDragging={props.isDragging}
            ></SplittedSubfield>

            <Divider flexItem sx={{ mx: 2 }} orientation="vertical"></Divider>

            <SplittedSubfield
                data={props.field.data["right"]} //
                updateSubField={(data: SplittedContentField["right"]) => updateSubField("right", data)}
                subFieldIndex={1}
                isDragging={props.isDragging}
            ></SplittedSubfield>
        </SplittedContentFieldBox>
    );
};

export default SplittedBody;
