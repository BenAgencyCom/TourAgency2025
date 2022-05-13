// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
import type { DroppableProvided, DropResult } from "react-beautiful-dnd";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
// Other components
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DescriptionHeader from "@/components/admin/create_destination/description/DescriptionHeader";
// Styled components
const CustomDialogTitle = styled(DialogTitle)({
    display: "flex",
    justifyContent: "flex-end",
});
const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
    "&::-webkit-scrollbar": { width: "10px" },
    "&::-webkit-scrollbar-track": { boxShadow: "inset 0 0 2px rgba(0,0,0,0.5)" },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "2px",
    },
}));

interface FullscreenWrapperProps {
    children: ReactNode;
    fullscreen: StatedDataField<boolean>;
    onDragEnd: (res: DropResult) => void;
}

const FullscreenWrapper: FunctionComponent<FullscreenWrapperProps> = (props) => {
    const closeDialog = () => props.fullscreen.setValue(false);

    return (
        <Dialog open={props.fullscreen.value} onClose={closeDialog} maxWidth="lg" fullWidth={true}>
            <CustomDialogTitle>
                <DescriptionHeader setFullscreen={false}>
                    <Button variant="contained" onClick={() => props.fullscreen.setValue(false)}>
                        Close
                    </Button>
                </DescriptionHeader>
            </CustomDialogTitle>

            <DragDropContext onDragEnd={props.onDragEnd}>
                <Droppable droppableId="content-fields">
                    {(provided: DroppableProvided) => {
                        return (
                            <CustomDialogContent
                                ref={provided.innerRef} //
                                {...provided.droppableProps}
                                id="content-fields-wrapper"
                            >
                                {props.children}
                                {provided.placeholder}
                            </CustomDialogContent>
                        );
                    }}
                </Droppable>
            </DragDropContext>
        </Dialog>
    );
};

export default FullscreenWrapper;
