// Tools
import stated from "@/utils/client/stated";
import { styled } from "@mui/system";
// Types
import type { DestinationContentField } from "@/@types/DestinationDescription";
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StagedDataField";
// Material UI Components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
// Other components
import SingleDestinationContent from "@/components/destinations/single/SingleDestinationContent";

const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
    "&::-webkit-scrollbar": { width: "10px" },
    "&::-webkit-scrollbar-track": { boxShadow: "inset 0 0 2px rgba(0,0,0,0.5)" },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "2px",
    },
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
}));

interface DescriptionPreviewProps {
    data: DestinationContentField[];
    open: StatedDataField<boolean>;
}

const DescriptionPreview: FunctionComponent<DescriptionPreviewProps> = (props) => {
    const closeDialog = () => props.open.setValue(false);
    return (
        <Dialog open={props.open.value} onClose={closeDialog} maxWidth="lg" fullWidth={true}>
            <CustomDialogTitle>
                <Button>Preview entire document</Button>
                <Button variant="contained" onClick={closeDialog}>
                    Close
                </Button>
            </CustomDialogTitle>

            <CustomDialogContent>
                <SingleDestinationContent
                    data={props.data} //
                    imageLoader={(url: string) => url}
                ></SingleDestinationContent>
            </CustomDialogContent>
        </Dialog>
    );
};

export default DescriptionPreview;
