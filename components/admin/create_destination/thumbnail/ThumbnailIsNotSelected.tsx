// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Other Components
import ThumbnailSkeleton from "@/components/admin/create_destination/thumbnail/ThumbnailSkeleton";
// Material UI Icons
import Photo from "@mui/icons-material/Photo";
// Styled Components
const SelectThumbnailHeader = styled(Typography)(({ theme }) => ({
    position: "absolute",
    color: theme.palette.text.primary,
    top: "50%",
    left: "0",
    width: "100%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
}));
interface ThumbnailIsNotSelectedProps {
    browseFiles: () => void;
}

const ThumbnailIsNotSelected: FunctionComponent<ThumbnailIsNotSelectedProps> = (props) => {
    return (
        <>
            <ThumbnailSkeleton></ThumbnailSkeleton>

            <SelectThumbnailHeader variant="h4">
                <Photo sx={{ fontSize: "5rem" }}></Photo>
                <Typography component="span" sx={{ textAlign: "center", my: 2, fontSize: "inherit" }}>
                    Select a thumbnail photo for a new destination
                </Typography>
                <Button variant="contained" onClick={props.browseFiles}>
                    Browse
                </Button>
            </SelectThumbnailHeader>
        </>
    );
};

export default ThumbnailIsNotSelected;
