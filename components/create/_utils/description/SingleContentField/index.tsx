// Tools
import { styled } from "@mui/system";
import { useState } from "react";
// Types
import { Theme } from "@mui/system";
import { ListItem } from "@/@types/redux";
import { FieldType } from "@/@types/Description";
import type { DescriptionContentField } from "@/@types/Description";
import type { FunctionComponent, Dispatch, SetStateAction } from "react";
import type { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
// Material UI Components
import Card from "@mui/material/Card";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
// Other components
import ControlHeader from "./Header";
import SingleDescriptionFieldBody from "./Body";
import { Draggable } from "react-beautiful-dnd";
// Material UI Icons
import ReportGmailerrorred from "@mui/icons-material/ReportGmailerrorred";
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { helpers } from "@/redux/slices/createContent";
import { displaySnackbar } from "@/redux/slices/snackbar";

const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => ({
    color: "text.primary", //
    marginBottom: "20px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff",
    border: "none",
    position: "relative",
    ["@media (max-width:900px)"]: {
        marginBottom: "60px",
    },
}));

const ValidationErrorIcon = styled("span")(({ theme }) => ({
    position: "absolute",
    top: "-15px",
    right: "0",
    color: theme.palette.error.main,
    opacity: 0.075,
    fontWeight: 500,
    svg: {
        marginRight: "10px",
        fontSize: "12rem",
    },
}));

interface SingleContentFieldProps {
    field: ListItem<DescriptionContentField>;
    index: number;
    blockDeleting: boolean;
    isValid: boolean;
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
            {(provided: DraggableProvided, snap: DraggableStateSnapshot) => {
                return (
                    <Fade in={true}>
                        <StyledCard
                            className="description-content-field" //
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            tabIndex={-1}
                        >
                            <Fade in={!props.isValid}>
                                <div>
                                    <ValidationErrorIcon>
                                        <ReportGmailerrorred className="validation-error" />
                                    </ValidationErrorIcon>
                                </div>
                            </Fade>
                            <ControlHeader
                                field={props.field}
                                blockDeleting={props.blockDeleting} //
                                handleDeletion={deleteThisField}
                                updateType={updateType}
                                refresh={() => setRefreshKey((val) => val + 1)}
                                index={props.index}
                            ></ControlHeader>

                            <Divider sx={{ my: 2 }} flexItem></Divider>

                            <SingleDescriptionFieldBody
                                field={props.field} //
                                refreshKey={refreshKey}
                                isDragging={snap.isDragging}
                            ></SingleDescriptionFieldBody>
                        </StyledCard>
                    </Fade>
                );
            }}
        </Draggable>
    );
};

export default SingleContentField;
