// Tools
import RWD from "./RWD";
import { useState } from "react";
import { styled } from "@mui/system";
import stated from "@/utils/client/stated";
// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/Description";
import type { DescriptionContentField, SplittedContentField } from "@/@types/Description";
// Other components
import HeaderText from "./Text";
import ChangeType from "./buttons/ChangeType";
import DeleteField from "./buttons/DeleteField";
import ChangeTypeDialog from "./dialogs/ChangeTypeDialog";
import SwapSplittedSides from "./buttons/SwapSplittedSides";
import DeleteConfirmationDialog from "./dialogs/DeleteConfirmationDialog";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const HeaderWrapper = styled("header")(({ theme }) => ({
    ...(RWD as any),
}));

interface SingleContentFieldControlHeaderProps {
    field: ListItem<DescriptionContentField>;
    blockDeleting: boolean;
    index: number;
    handleDeletion: () => void;
    updateType: (newType: FieldType) => void;
    refresh: () => void;
}

const SingleContentFieldControlHeader: FunctionComponent<SingleContentFieldControlHeaderProps> = (props) => {
    const [changeTypeDialog, setChangeTypeDialog] = useState<boolean>(false);
    const [deleteConfirmationDialog, setDeleteConfirmationDialog] = useState<boolean>(false);

    const { type: currentType } = props.field.data;

    return (
        <>
            {/* DIALOGS */}
            <ChangeTypeDialog
                open={stated<boolean>(changeTypeDialog, setChangeTypeDialog)} //
                updateType={props.updateType}
                currentType={currentType}
            ></ChangeTypeDialog>
            <DeleteConfirmationDialog
                openDialog={stated<boolean>(deleteConfirmationDialog, setDeleteConfirmationDialog)} //
                handleDeletion={props.handleDeletion}
            ></DeleteConfirmationDialog>

            {/* ACTUAL CONTENT */}
            <HeaderWrapper className="description-content-field-header">
                <HeaderText currentType={currentType} index={props.index}></HeaderText>

                <FlexBox>
                    {currentType === FieldType.SPLITTED && (
                        <SwapSplittedSides
                            field={props.field as ListItem<SplittedContentField>} //
                            refresh={props.refresh}
                        ></SwapSplittedSides>
                    )}

                    <ChangeType openAddingFieldTypeDialog={() => setChangeTypeDialog(true)}></ChangeType>

                    <DeleteField
                        blockDeleting={props.blockDeleting} //
                        prepareDeletion={() => setDeleteConfirmationDialog(true)}
                    ></DeleteField>
                </FlexBox>
            </HeaderWrapper>
        </>
    );
};

export default SingleContentFieldControlHeader;
