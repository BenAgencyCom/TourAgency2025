// Tools
import restrictions from "@/utils/restrictions/createDestination";
import { useState } from "react";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, Dispatch, SetStateAction } from "react";
import { Theme } from "@mui/system";
import { FieldType } from "@/@types/DestinationDescription";
import type {
    DraggableDestinationContentField,
    DraggableHeaderContentField,
    DraggableParagraphContentField,
    DraggableImageContentField,
    DraggableSplittedContentField,
} from "@/@types/DestinationDescription";
import type { DraggableProvided } from "react-beautiful-dnd";
// Material UI Components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
// Other components
import { Draggable } from "react-beautiful-dnd";
import HeaderBody from "./body/Header";
import ParagraphBody from "./body/Paragraph";
import ImageBody from "./body/Image";
import Splitted from "./body/Splitted";
import ControlHeader from "./SingleContentFieldControlHeader";
// Redux
import { displaySnackbar } from "@/redux/slices/snackbar";
import { useAppDispatch } from "@/redux/hooks";

const CustomCard = styled(Card)(({ theme }: { theme: Theme }) => ({
    color: "text.primary", //
    marginBottom: "20px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));

interface SingleContentFieldProps {
    index: number;
    blockDeleting: boolean;
    fullscreen: boolean;
    data: DraggableDestinationContentField;
    _setScrollableKey: Dispatch<SetStateAction<number>>;
    updateData: (valueAfterModification: DraggableDestinationContentField | "REMOVE_THIS_ELEMENT") => void;
}

const SingleContentField: FunctionComponent<SingleContentFieldProps> = (props) => {
    const dispatch = useAppDispatch();
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const updateSingleProp = <T extends DraggableDestinationContentField>(prop: keyof T, value: T[typeof prop]) => {
        const data = props.data as unknown as T;
        data[prop] = value;
        props.updateData(data);
        setRefreshKey((val) => val + 1);
    };

    const updateType = (newType: FieldType) => {
        const data: DraggableDestinationContentField = JSON.parse(JSON.stringify(props.data));
        data.type = newType;

        ["header", "content", "src", "url"].forEach((prop) => delete data[prop as keyof DraggableDestinationContentField]);
        // Change into HEADER
        if (newType === FieldType.HEADER) {
            (data as DraggableHeaderContentField).header = "";
        }
        // Change into PARAGRAPH
        else if (newType === FieldType.PARAGRAPH) {
            (data as DraggableParagraphContentField).content = "";
        }
        // Change into IMAGE
        else if (newType === FieldType.IMAGE) {
            (data as DraggableImageContentField).url = null;
            (data as DraggableImageContentField).src = null;
        }
        // Change into SPLITTED
        else if (newType === FieldType.SPLITTED) {
            (data as DraggableSplittedContentField).left = {
                type: FieldType.PARAGRAPH,
                content: "",
            };
            (data as DraggableSplittedContentField).right = {
                type: FieldType.IMAGE,
                url: null,
                src: null,
            };
        }
        props._setScrollableKey((val) => val + 1);
        props.updateData(data);

        dispatch(
            displaySnackbar({
                msg: "Type has been changed successfully",
                severity: "success",
                hideAfter: 3000,
            })
        );
    };

    const deleteThisField = () => {
        props.updateData("REMOVE_THIS_ELEMENT");
        dispatch(
            displaySnackbar({
                msg: "The field has been deleted successfully",
                severity: "success",
                hideAfter: 3000,
            })
        );
    };

    const swapLeftWithRight = () => {
        if (props.data.type === FieldType.SPLITTED) {
            const data = Object.assign({}, props.data) as DraggableSplittedContentField;
            const oldLeft = Object.assign({}, data.left);
            const oldRight = Object.assign({}, data.right);

            data.left = oldRight;
            data.right = oldLeft;

            props.updateData(data);
        }
    };

    return (
        <Draggable
            draggableId={props.data.id} //
            index={props.index}
        >
            {(provided: DraggableProvided) => {
                return (
                    <Fade in={true}>
                        <CustomCard
                            className="description-conent-field" //
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <ControlHeader
                                data={props.data}
                                blockDeleting={props.blockDeleting} //
                                handleDeletion={deleteThisField}
                                updateType={updateType}
                                swap={swapLeftWithRight}
                            ></ControlHeader>

                            <Divider sx={{ my: 2 }} flexItem></Divider>
                            {(() => {
                                switch (props.data.type) {
                                    case FieldType.HEADER:
                                        return (
                                            <HeaderBody
                                                data={props.data}
                                                updateSingleProp={(prop: keyof DraggableHeaderContentField, val: DraggableHeaderContentField[typeof prop]) => {
                                                    return updateSingleProp<DraggableHeaderContentField>(prop, val);
                                                }}
                                                restrictions={restrictions.description.header}
                                            ></HeaderBody>
                                        );
                                    case FieldType.PARAGRAPH:
                                        return (
                                            <ParagraphBody
                                                data={props.data}
                                                fullscreen={props.fullscreen}
                                                updateSingleProp={(prop: keyof DraggableParagraphContentField, val: DraggableParagraphContentField[typeof prop]) => {
                                                    return updateSingleProp<DraggableParagraphContentField>(prop, val);
                                                }}
                                                restrictions={restrictions.description.paragraph}
                                            ></ParagraphBody>
                                        );
                                    case FieldType.IMAGE:
                                        return (
                                            <ImageBody
                                                data={props.data}
                                                fullscreen={props.fullscreen}
                                                updateSingleProp={(prop: keyof DraggableImageContentField, val: DraggableImageContentField[typeof prop]) => {
                                                    return updateSingleProp<DraggableImageContentField>(prop, val);
                                                }}
                                                key={refreshKey}
                                            ></ImageBody>
                                        );
                                    case FieldType.SPLITTED:
                                        return (
                                            <Splitted
                                                data={props.data}
                                                fullscreen={props.fullscreen}
                                                updateSingleProp={(prop: keyof DraggableSplittedContentField, val: DraggableSplittedContentField[typeof prop]) => {
                                                    return updateSingleProp<DraggableSplittedContentField>(prop, val);
                                                }}
                                                restrictions={restrictions.description.paragraph}
                                            ></Splitted>
                                        );
                                }
                            })()}
                        </CustomCard>
                    </Fade>
                );
            }}
        </Draggable>
    );
};

export default SingleContentField;
