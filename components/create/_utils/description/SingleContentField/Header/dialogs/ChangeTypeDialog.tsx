// Tools
import { useState } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import { FieldType } from "@/@types/Description";
import { StatedDataField } from "@/@types/StatedDataField";
// Other components
import StyledDialog from "@/components/create/_utils/forms/Dialog";
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";
import DescriptionFieldIcon from "@/components/create/_utils/forms/DescriptionFieldIcon";
// Material UI Icons
import Public from "@mui/icons-material/Public";

interface ChangeTypeDialogProps {
    currentType: FieldType;
    open: StatedDataField<boolean>;
    updateType: (type: any) => void;
    excludeFromTypes?: FieldType[];
}

const ChangeTypeDialog: FunctionComponent<ChangeTypeDialogProps> = (props) => {
    const { open, currentType, excludeFromTypes, updateType } = props;

    const [newType, setNewType] = useState<FieldType>(currentType);

    const onSelect = (e: ChangeEvent<HTMLInputElement>) => {
        setNewType(e.target.value as any);
    };

    const confirm = () => updateType(newType);

    return (
        <StyledDialog
            open={open} //
            confirm={confirm}
            title={`Select new content field's type`}
            disableContinueButton={newType === currentType}
            backgroundIcon={<DescriptionFieldIcon fieldType={newType} />}
        >
            <SelectWithIcon
                icon={<Public />} //
                value={newType}
                onChange={(e: any) => onSelect(e)}
                options={[
                    { label: "Header", value: FieldType.HEADER }, //
                    { label: "Paragraph", value: FieldType.PARAGRAPH }, //
                    { label: "Image", value: FieldType.IMAGE }, //
                    { label: "Splitted", value: FieldType.SPLITTED }, //
                ].filter((el) => !excludeFromTypes || !excludeFromTypes.includes(el.value))}
                sx={{ width: "100%" }}
            ></SelectWithIcon>
        </StyledDialog>
    );
};

export default ChangeTypeDialog;
