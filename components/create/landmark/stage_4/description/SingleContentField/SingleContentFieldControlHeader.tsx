// Tools
import { styled } from "@mui/system";
import { useState } from "react";
import stated from "@/utils/client/stated";
// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/Description";
import type { DescriptionContentField, SplittedContentField } from "@/@types/Description";
// Material UI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Other components
import ChangeTypeDialog from "@/components/admin/create_destination/description/single_content_field/ChangeTypeDialog";
import DeleteConfirmationDialog from "@/components/admin/create_destination/description/single_content_field/DeleteConfirmationDialog";
// Material UI Icons
import Delete from "@mui/icons-material/Delete";

const Wrapper = styled(Box)({
    display: "flex", //
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
});

interface SingleContentFieldControlHeaderProps {
    field: ListItem<DescriptionContentField>;
    blockDeleting: boolean;
    handleDeletion: () => void;
    updateType: (newType: FieldType) => void;
    refresh: () => void;
}

const SingleContentFieldControlHeader: FunctionComponent<SingleContentFieldControlHeaderProps> = (props) => {
    const [changeTypeDialog, setChangeTypeDialog] = useState<boolean>(false);
    const [deleteConfirmationDialog, setDeleteConfirmationDialog] = useState<boolean>(false);

    const { type: currentType } = props.field.data;

    const swapLeftWithRight = () => {
        if (currentType === FieldType.SPLITTED) {
            const { left, right, ...rest } = props.field.data as SplittedContentField;
            props.field.replace({
                left: right,
                right: left,
                ...rest,
            });
            props.refresh();
        }
    };

    return (
        <>
            {/* DIALOGS */}
            <ChangeTypeDialog
                openDialog={stated<boolean>(changeTypeDialog, setChangeTypeDialog)} //
                updateType={props.updateType}
                currentType={currentType}
            ></ChangeTypeDialog>
            <DeleteConfirmationDialog
                openDialog={stated<boolean>(deleteConfirmationDialog, setDeleteConfirmationDialog)} //
                handleDeletion={props.handleDeletion}
            ></DeleteConfirmationDialog>

            {/* ACTUAL CONTENT */}
            <Wrapper component="header">
                <Typography variant="h6"> {FieldType[currentType]}</Typography>
                <Box>
                    {(() => {
                        if (currentType === FieldType.SPLITTED) {
                            return (
                                <Button
                                    sx={{ mx: 1 }} //
                                    variant="outlined"
                                    onClick={swapLeftWithRight}
                                >
                                    Swap
                                </Button>
                            );
                        }
                    })()}
                    <Button
                        sx={{ mx: 1 }} //
                        variant="outlined"
                        onClick={() => setChangeTypeDialog(true)}
                    >
                        Change type
                    </Button>
                    <Button
                        onClick={() => setDeleteConfirmationDialog(true)} //
                        disabled={props.blockDeleting}
                        variant="outlined"
                    >
                        <Delete></Delete>
                    </Button>
                </Box>
            </Wrapper>
        </>
    );
};

export default SingleContentFieldControlHeader;
