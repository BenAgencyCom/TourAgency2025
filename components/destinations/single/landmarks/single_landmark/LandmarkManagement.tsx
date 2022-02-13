// Tools
import { useState } from "react";
import { styled, alpha } from "@mui/system";
import stated from "@/utils/client/stated";
// Types
import type { LandmarkPictureResolution } from "@/@types/pages/SingleDestination";
import type { FunctionComponent } from "react";
// Material UI Components
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
// Other Components
import ImageModal from "@/components/_utils/ImageModal";
// Material UI Icons
import ZoomIn from "@mui/icons-material/ZoomIn";
// Styled Components
const BetterIconButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: "20px",
    right: "20px",
    zIndex: 10,
    background: alpha(theme.palette.background.paper, 0.7),
    borderRadius: 10,
    "&:hover": {
        background: alpha(theme.palette.background.paper, 0.4),
    },
}));
interface LandmarkManagementProps {
    createImagePath: (resolution: LandmarkPictureResolution) => string;
}

const LandmarkManagement: FunctionComponent<LandmarkManagementProps> = (props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    return (
        <>
            <Tooltip title="Preview" placement="top">
                <BetterIconButton onClick={() => setOpenModal(true)}>
                    <ZoomIn></ZoomIn>
                </BetterIconButton>
            </Tooltip>

            <ImageModal
                open={stated(openModal, setOpenModal)} //
                imageURL={props.createImagePath("1080p")}
            ></ImageModal>
        </>
    );
};

export default LandmarkManagement;
