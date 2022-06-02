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
    ["@media (max-width:500px)"]: {
        flexDirection: "column",
        button: {
            width: "100%",
            marginTop: "10px",
            marginLeft: 0,
            marginRight: 0,
            "&>nth-of-type(1)": {
                marginTop: 0,
            },
        },
    },
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
            <Button sx={{ mr: "10px", width: "200px" }} disabled={disableNavigation} onClick={openPreviewMode}>
                Preview
            </Button>

            <Button
                sx={{ width: "200px" }} //
                onClick={() => props.addNewContentFieldDialog.setValue(true)}
            >
                Add content field
            </Button>
            {/* Dialog */}
            <SelectNewContentFieldType open={props.addNewContentFieldDialog}></SelectNewContentFieldType>
        </Wrapper>
    );
};

export default DescriptionHeader;
