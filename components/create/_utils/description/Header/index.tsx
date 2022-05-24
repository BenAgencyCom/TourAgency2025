// Tools
import { styled } from "@mui/system";
// Types
import { StatedDataField } from "@/@types/StatedDataField";
import type { FunctionComponent } from "react";
// Other components
import SelectNewContentFieldType from "./SelectNewContentFieldType";
// Redux
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { actions as createContentActions } from "@/redux/slices/createContent";
// Styled components
import Button from "@/components/create/_utils/forms/Button";

const Wrapper = styled("header")({
    display: "flex",
    alignItems: "center",
    width: "100%",
});

interface DescriptionHeaderProps {
    addNewContentFieldDialog: StatedDataField<boolean>;
}
const DescriptionHeader: FunctionComponent<DescriptionHeaderProps> = (props) => {
    const dispatch = useAppDispatch();
    const { disableNavigation } = useAppSelector((state) => state.createContent);
    const openPreviewMode = () => dispatch(createContentActions.setPreviewMode(true));

    return (
        <Wrapper sx={{ mb: "20px" }}>
            <Button sx={{ mr: "10px" }} disabled={disableNavigation} onClick={openPreviewMode}>
                Preview
            </Button>

            <SelectNewContentFieldType open={props.addNewContentFieldDialog}></SelectNewContentFieldType>

            <Button onClick={() => props.addNewContentFieldDialog.setValue(true)}>Add content field</Button>
        </Wrapper>
    );
};

export default DescriptionHeader;
