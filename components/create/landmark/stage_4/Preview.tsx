// Tools
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import DescriptionPreview from "@/components/_utils/Description";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { actions as createContentActions } from "@/redux/slices/createContent";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";

const PreviewMode: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const { list: description } = useAppSelector((state) => state.createContent);

    const openEditMode = () => dispatch(createContentActions.setPreviewMode(false));

    return (
        <>
            <Box sx={{ mb: "40px" }}>
                <StyledButton onClick={openEditMode} sx={{ width: "200px" }}>
                    Edit
                </StyledButton>
            </Box>
            <DescriptionPreview
                data={description.map((el) => el.data)} //
                imageLoader={(url: string) => url}
                disableScrollAnimation
            ></DescriptionPreview>
        </>
    );
};

export default PreviewMode;
