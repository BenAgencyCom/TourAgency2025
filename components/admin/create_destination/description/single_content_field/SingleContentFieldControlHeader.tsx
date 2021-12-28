// Tools
import { styled } from "@mui/system";
import { useState } from "react";
import stated from "@/utils/client/stated";
// Types
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/DestinationDescription";
import type { DraggableDestinationContentField } from "@/@types/DestinationDescription";
// Material UI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Other components
import ChangeTypeDialog from "./ChangeTypeDialog";
// Material UI Icons
import Delete from "@mui/icons-material/Delete";

const Wrapper = styled(Box)({
    display: "flex", //
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
});

interface SingleContentFieldControlHeaderProps {
    data: DraggableDestinationContentField;
    blockDeleting: boolean;
    handleDeletion: () => void;
    updateType: (newType: FieldType) => void;
}

const SingleContentFieldControlHeader: FunctionComponent<SingleContentFieldControlHeaderProps> = (props) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    return (
        <Wrapper component="header">
            <ChangeTypeDialog
                openDialog={stated<boolean>(openDialog, setOpenDialog)} //
                updateType={props.updateType}
                currentType={props.data.type}
            ></ChangeTypeDialog>

            <Typography variant="h6"> {FieldType[props.data.type]}</Typography>
            <Box>
                <Button
                    sx={{ mx: 1 }}
                    variant="outlined"
                    onClick={() => {
                        setOpenDialog(true);
                    }}
                >
                    Change type
                </Button>
                <Button onClick={props.handleDeletion} disabled={props.blockDeleting} variant="outlined">
                    <Delete></Delete>
                </Button>
            </Box>
        </Wrapper>
    );
};

export default SingleContentFieldControlHeader;
