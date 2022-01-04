// Tools
import { useState } from "react";
import { styled } from "@mui/system";
// Types
import type { Restriction } from "@/@types/Restriction";
import type { FunctionComponent } from "react";
import type { DraggableSplittedContentField, SplittedSubfieldField } from "@/@types/DestinationDescription";
// Material UI Icons
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
// Other components
import SpliitedSubField from "./_SplittedSubField";
// Styled components
const SplittedContentField = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
});

interface SplittedBodyProps {
    data: DraggableSplittedContentField;
    fullscreen: boolean;
    restrictions: Restriction;
    updateSingleProp: (prop: keyof DraggableSplittedContentField, val: DraggableSplittedContentField[typeof prop]) => void;
}

const SplittedBody: FunctionComponent<SplittedBodyProps> = (props) => {
    const updateSubField = (subfield: "left" | "right", data: DraggableSplittedContentField[typeof subfield]) => {
        props.updateSingleProp(subfield, data);
    };

    return (
        <SplittedContentField>
            <SpliitedSubField
                data={props.data["left"]} //
                fullscreen={props.fullscreen}
                updateSubField={(data: DraggableSplittedContentField["left"]) => updateSubField("left", data)}
            ></SpliitedSubField>

            <Divider flexItem sx={{ mx: 2 }} orientation="vertical"></Divider>

            <SpliitedSubField
                data={props.data["right"]} //
                fullscreen={props.fullscreen}
                updateSubField={(data: DraggableSplittedContentField["right"]) => updateSubField("right", data)}
            ></SpliitedSubField>
        </SplittedContentField>
    );
};

export default SplittedBody;
