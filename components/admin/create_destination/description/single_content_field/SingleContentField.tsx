// Tools
import restrictions from "@/utils/restrictions/createDestination_OLD";
import { useState } from "react";
import { styled } from "@mui/system";
// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent, Dispatch, SetStateAction } from "react";
import { Theme } from "@mui/system";
import { FieldType } from "@/@types/Description";
import type { DescriptionContentField, HeaderContentField, ParagraphContentField, ImageContentField, SplittedContentField } from "@/@types/Description";
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
import { helpers } from "@/redux/slices/create_destination/description";
import { useAppDispatch } from "@/hooks/useRedux";

const CustomCard = styled(Card)(({ theme }: { theme: Theme }) => ({
    color: "text.primary", //
    marginBottom: "20px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));

interface SingleContentFieldProps {
    field: ListItem<DescriptionContentField>;
    index: number;
    blockDeleting: boolean;
    fullscreen: boolean;
    _setScrollableKey: Dispatch<SetStateAction<number>>;
}

const SingleContentField: FunctionComponent<SingleContentFieldProps> = (props) => {
    const dispatch = useAppDispatch();
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const { createContentField } = helpers;

    const updateType = (newType: FieldType) => {
        props.field.replace(createContentField(newType));

        props._setScrollableKey((val) => val + 1);
        dispatch(
            displaySnackbar({
                msg: "Type has been changed successfully",
                severity: "success",
                hideAfter: 3000,
            })
        );
    };

    const deleteThisField = () => {
        props.field.remove();
        dispatch(
            displaySnackbar({
                msg: "The field has been deleted successfully",
                severity: "success",
                hideAfter: 3000,
            })
        );
    };

    return (
        <Draggable
            draggableId={props.field.id} //
            index={props.index}
        >
            {(provided: DraggableProvided) => {
                return (
                    <Fade in={true}>
                        <CustomCard
                            className="description-content-field" //
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <ControlHeader
                                field={props.field}
                                blockDeleting={props.blockDeleting} //
                                handleDeletion={deleteThisField}
                                updateType={updateType}
                                refresh={() => setRefreshKey((val) => val + 1)}
                            ></ControlHeader>

                            <Divider sx={{ my: 2 }} flexItem></Divider>
                            {(() => {
                                switch (props.field.data.type) {
                                    case FieldType.HEADER:
                                        return (
                                            <HeaderBody
                                                field={props.field as ListItem<HeaderContentField>} //
                                                restrictions={restrictions.description.header}
                                            ></HeaderBody>
                                        );
                                    case FieldType.PARAGRAPH:
                                        return (
                                            <ParagraphBody
                                                field={props.field as ListItem<ParagraphContentField>}
                                                fullscreen={props.fullscreen}
                                                restrictions={restrictions.description.paragraph}
                                            ></ParagraphBody>
                                        );
                                    case FieldType.IMAGE:
                                        return (
                                            <ImageBody
                                                url={(props.field.data as ImageContentField).url} //
                                                fullscreen={props.fullscreen}
                                                key={refreshKey}
                                                updateSingleProp={(prop: keyof ImageContentField, val: ImageContentField[typeof prop]) => {
                                                    (props.field as ListItem<ImageContentField>).changeProperty(prop, val);
                                                }}
                                            ></ImageBody>
                                        );
                                    case FieldType.SPLITTED:
                                        return (
                                            <Splitted
                                                field={props.field as ListItem<SplittedContentField>} //
                                                fullscreen={props.fullscreen}
                                                restrictions={restrictions.description.paragraph}
                                                key={refreshKey}
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
