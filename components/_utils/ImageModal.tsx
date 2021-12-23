import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StagedDataField";
// Other Components
import Image from "next/Image";
// Material UI Components
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

interface ThumbnailModalProps {
    open: StatedDataField<boolean>;
    imageURL: string;
}

const ThumbnailModal: FunctionComponent<ThumbnailModalProps> = (props) => {
    const closeModal = () => props.open.setValue(false);
    return (
        <Modal open={props.open.value} onClose={closeModal}>
            <Fade in={props.open.value}>
                <Box
                    sx={{
                        position: "absolute" as "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "calc(100vw - 20px)",
                        maxHeight: "calc(100vh - 20px)",
                        width: "1920px",
                        height: "1020px",
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Image src={props.imageURL} layout="fill" alt="thumbnail"></Image>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            position: "absolute", //
                            transform: "translateX(-50%)",
                            left: "50%",
                            bottom: "10px",
                        }}
                        onClick={closeModal}
                    >
                        Close
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ThumbnailModal;
