// Tools
import restrictions from "@/utils/restrictions/createDestination";
import { useState } from "react";
// Types
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/DestinationDescription";
import type { DraggableDestinationContentField, DraggableHeaderContentField, DraggableParagraphContentField, DraggableImageContentField } from "@/@types/DestinationDescription";
import type { DraggableProvided } from "react-beautiful-dnd";
// Material UI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Divider from "@mui/material/Divider";
// Other components
import { Draggable } from "react-beautiful-dnd";
import HeaderBody from "./body/Header";
import ParagraphBody from "./body/Paragraph";
import ImageBody from "./body/Image";
// Material UI Icons
import Delete from "@mui/icons-material/Delete";

interface SingleContentFieldProps {
    index: number;
    contentLength: number;
    data: DraggableDestinationContentField;
    updateData: (valueAfterModification: DraggableDestinationContentField | "REMOVE_THIS_ELEMENT") => void;
}

const SingleContentField: FunctionComponent<SingleContentFieldProps> = (props) => {
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const deleteField = () => {
        props.updateData("REMOVE_THIS_ELEMENT");
    };

    const updateData = <T extends DraggableDestinationContentField>(prop: keyof T, value: T[typeof prop]) => {
        const data = props.data as unknown as T;
        data[prop] = value;
        props.updateData(data);
        setRefreshKey((val) => val + 1);
    };

    return (
        <Draggable
            draggableId={props.data.id} //
            index={props.index}
        >
            {(provided: DraggableProvided) => {
                return (
                    <Card
                        sx={{
                            color: "text.primary", //
                            mb: 2,
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }} //
                        className="description-conent-field"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Box
                            sx={{
                                display: "flex", //
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <Typography variant="h4"> {FieldType[props.data.type]}</Typography>
                            <ButtonGroup>
                                <Button>Change type</Button>
                                <Button onClick={deleteField} disabled={props.contentLength < 3}>
                                    <Delete></Delete>
                                </Button>
                            </ButtonGroup>
                        </Box>
                        <Divider sx={{ my: 2 }} flexItem></Divider>
                        {(() => {
                            switch (props.data.type) {
                                case FieldType.HEADER:
                                    return (
                                        <HeaderBody
                                            data={props.data}
                                            updateData={(prop: keyof DraggableHeaderContentField, val: DraggableHeaderContentField[typeof prop]) => {
                                                return updateData<DraggableHeaderContentField>(prop, val);
                                            }}
                                            restrictions={restrictions.description.header}
                                        ></HeaderBody>
                                    );
                                case FieldType.PARAGRAPH:
                                    return (
                                        <ParagraphBody
                                            data={props.data}
                                            updateData={(prop: keyof DraggableParagraphContentField, val: DraggableParagraphContentField[typeof prop]) => {
                                                return updateData<DraggableParagraphContentField>(prop, val);
                                            }}
                                            restrictions={restrictions.description.paragraph}
                                        ></ParagraphBody>
                                    );
                                case FieldType.IMAGE:
                                    return (
                                        <ImageBody
                                            data={props.data}
                                            updateData={(prop: keyof DraggableImageContentField, val: DraggableImageContentField[typeof prop]) => {
                                                return updateData<DraggableImageContentField>(prop, val);
                                            }}
                                            key={refreshKey}
                                        ></ImageBody>
                                    );
                            }
                        })()}
                    </Card>
                );
            }}
        </Draggable>
    );
};

export default SingleContentField;
