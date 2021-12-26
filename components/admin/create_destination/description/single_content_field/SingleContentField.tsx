// Types
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/DestinationDescription";
import type { DraggableDestinationContentField } from "@/@types/DestinationDescription";
import type { DraggableProvided } from "react-beautiful-dnd";
// Material UI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// Other components
import { Draggable } from "react-beautiful-dnd";

interface SingleContentFieldProps {
    index: number;
    data: DraggableDestinationContentField;
    updateData: (valueAfterModification: DraggableDestinationContentField | "REMOVE_THIS_ELEMENT") => void;
}

const SingleContentField: FunctionComponent<SingleContentFieldProps> = (props) => {
    const deleteField = () => {
        props.updateData("REMOVE_THIS_ELEMENT");
    };
    return (
        <Draggable
            draggableId={props.data.id} //
            index={props.index}
        >
            {(provided: DraggableProvided) => {
                return (
                    <Card
                        sx={{ color: "text.primary", mb: 2, p: 2 }} //
                        className="description-conent-field"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <span>{props.data.id}</span>
                        <button onClick={deleteField}>remove</button>
                    </Card>
                );
            }}
        </Draggable>
    );
};

export default SingleContentField;
