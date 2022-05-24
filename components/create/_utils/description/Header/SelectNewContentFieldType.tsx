// Types
import { FieldType } from "@/@types/Description";
import { StatedDataField } from "@/@types/StatedDataField";
import type { FunctionComponent, ChangeEvent } from "react";
// Other components
import StyledDialog from "@/components/create/_utils/forms/Dialog";
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";
import DescriptionFieldIcon from "@/components/create/_utils/forms/DescriptionFieldIcon";
// Material UI Icons
import Public from "@mui/icons-material/Public";
// Redux
import { displaySnackbar } from "@/redux/slices/snackbar";
import { actions, helpers } from "@/redux/slices/createContent";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";

interface SelectNewContentFieldTypeProps {
    open: StatedDataField<boolean>;
}

const SelectNewContentFieldType: FunctionComponent<SelectNewContentFieldTypeProps> = (props) => {
    const dispatch = useAppDispatch();
    const newFieldType = useAppSelector((store) => store.createContent.newFieldType);
    const { updateNewFieldType } = actions;
    const { addItemWithAutomaticType } = helpers;

    const onSelect = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateNewFieldType(e.target.value as unknown as FieldType));
    };

    const confirm = () => {
        addItemWithAutomaticType();
        props.open.setValue(false);
        dispatch(
            displaySnackbar({
                msg: "Content field has been added successfully",
                severity: "success",
                hideAfter: 3000,
            })
        );
    };

    return (
        <StyledDialog
            open={props.open} //
            confirm={confirm}
            title={`Select new content field's type`}
            backgroundIcon={<DescriptionFieldIcon fieldType={newFieldType} />}
        >
            <SelectWithIcon
                icon={<Public />} //
                value={newFieldType}
                onChange={(e: any) => onSelect(e)}
                options={[
                    { label: "Header", value: FieldType.HEADER }, //
                    { label: "Paragraph", value: FieldType.PARAGRAPH }, //
                    { label: "Image", value: FieldType.IMAGE }, //
                    { label: "Splitted", value: FieldType.SPLITTED }, //
                ]}
                sx={{ width: "100%" }}
            ></SelectWithIcon>
        </StyledDialog>
    );
};

export default SelectNewContentFieldType;
