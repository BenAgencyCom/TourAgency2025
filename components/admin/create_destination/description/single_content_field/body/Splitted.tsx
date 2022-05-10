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
import SpliitedSubField from "./_SplittedSubField";
// Styled components
const SplittedContentFieldBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
});

interface SplittedBodyProps {
    field: ListItem<SplittedContentField>;
    fullscreen: boolean;
    restrictions: Restriction;
}

const SplittedBody: FunctionComponent<SplittedBodyProps> = (props) => {
    const updateSubField = (subfield: "left" | "right", data: SplittedContentField[typeof subfield]) => {
        props.field.changeProperty(subfield, data);
    };

    return (
        <SplittedContentFieldBox>
            <SpliitedSubField
                data={props.field.data["left"]} //
                fullscreen={props.fullscreen}
                updateSubField={(data: SplittedContentField["left"]) => updateSubField("left", data)}
            ></SpliitedSubField>

            <Divider flexItem sx={{ mx: 2 }} orientation="vertical"></Divider>

            <SpliitedSubField
                data={props.field.data["right"]} //
                fullscreen={props.fullscreen}
                updateSubField={(data: SplittedContentField["right"]) => updateSubField("right", data)}
            ></SpliitedSubField>
        </SplittedContentFieldBox>
    );
};

export default SplittedBody;
