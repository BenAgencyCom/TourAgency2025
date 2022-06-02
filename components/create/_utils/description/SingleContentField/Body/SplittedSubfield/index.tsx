// Tools
import { useState } from "react";
import { styled } from "@mui/system";
import stated from "@/utils/client/stated";
// Types
import { FieldType } from "@/@types/Description";
import type { FunctionComponent } from "react";
import type { SplittedSubfieldField } from "@/@types/Description";
// Other components
import ChangeTypeDialog from "../../Header/dialogs/ChangeTypeDialog";
import SplittedSubfieldBody from "./SplittedSubfieldBody";
import SplittedSubfieldHeader from "./SplittedSubfieldHeader";
// Redux
import { helpers } from "@/redux/slices/createContent";
// Styled components
const SingleSubfieldWrapper = styled("div")(({ theme }) => ({
    width: "49%",
    display: "flex",
    flexDirection: "column",
    minHeight: "400px",
}));

interface SplittedSubfiledProps {
    subFieldIndex: number;
    data: SplittedSubfieldField;
    updateSubField: (data: SplittedSubfieldField) => void;
    isDragging: boolean;
}

const SplittedSubfiled: FunctionComponent<SplittedSubfiledProps> = (props) => {
    const [openChangeTypeDialog, setOpenChangeTypeDialog] = useState<boolean>(false);

    const updateType = (newType: FieldType.PARAGRAPH | FieldType.IMAGE) => {
        setOpenChangeTypeDialog(false);
        props.updateSubField(helpers.createContentField(newType) as SplittedSubfieldField);
    };

    return (
        <>
            {/* DIALOGS */}
            <ChangeTypeDialog
                open={stated<boolean>(openChangeTypeDialog, setOpenChangeTypeDialog)} //
                updateType={updateType}
                excludeFromTypes={[FieldType.HEADER, FieldType.SPLITTED]}
                currentType={props.data.type}
            ></ChangeTypeDialog>

            {/* ACTUAL CONTENT */}
            <SingleSubfieldWrapper className="splitted-subfield">
                <SplittedSubfieldHeader
                    fieldType={props.data.type} //
                    openTypeChangeDialog={() => setOpenChangeTypeDialog(true)}
                    subFieldIndex={props.subFieldIndex}
                ></SplittedSubfieldHeader>

                <SplittedSubfieldBody
                    data={props.data} //
                    updateSubField={props.updateSubField}
                    isDragging={props.isDragging}
                ></SplittedSubfieldBody>
            </SingleSubfieldWrapper>
        </>
    );
};

export default SplittedSubfiled;
