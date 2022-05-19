// Tools
import { styled } from "@mui/system";
import { useState } from "react";
import stated from "@/utils/client/stated";
// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/Description";
import type { DescriptionContentField, SplittedContentField } from "@/@types/Description";
// Material UI Components
import Tooltip from "@mui/material/Tooltip";
// Other components
import ChangeTypeDialog from "./ChangeTypeDialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import DescriptionFieldIcon from "@/components/create/_utils/forms/DescriptionFieldIcon";
// Material UI Icons
import Delete from "@mui/icons-material/Delete";
// Styled components
import Button from "@/components/create/_utils/forms/Button";
import FlexBox from "@/components/_utils/styled/FlexBox";

const Wrapper = styled("header")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    h4: {
        margin: "20px 0",
        fontSize: "1.8rem",
        display: "flex",
        alignItems: "flex-end",
        fontWeight: "500",
        userSelect: "none",
        strong: {
            fontWeight: "700",
        },
        svg: {
            marginRight: "10px",
            fontSize: "2.5rem",
            color: theme.palette.primary.main,
        },
        ".primary": {
            color: theme.palette.primary.main,
        },
    },
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

    const swapLeftWithRight = () => {
        if (currentType === FieldType.SPLITTED) {
            const { left, right, ...rest } = props.field.data as SplittedContentField;
            props.field.replace({
                left: right,
                right: left,
                ...rest,
            });
            props.refresh();
        }
    };

    const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1).toLowerCase();

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
            <Wrapper>
                <h4>
                    <DescriptionFieldIcon fieldType={props.field.data.type} />
                    <span>
                        Field <span className="primary">{props.index + 1}</span> / <strong>{capitalize(FieldType[currentType])}</strong>
                    </span>
                </h4>
                <FlexBox>
                    {(() => {
                        if (currentType === FieldType.SPLITTED) {
                            return (
                                <Tooltip title="Swap left and right sides" placement="top">
                                    <div>
                                        <Button sx={{ mr: "10px" }} onClick={swapLeftWithRight}>
                                            Swap
                                        </Button>
                                    </div>
                                </Tooltip>
                            );
                        }
                    })()}
                    <Tooltip title="Delete this field" placement="top">
                        <div>
                            <Button
                                sx={{ mr: "10px" }} //
                                onClick={() => setChangeTypeDialog(true)}
                            >
                                Change type
                            </Button>
                        </div>
                    </Tooltip>

                    <Tooltip
                        title="Delete this field" //
                        placement="top"
                        PopperProps={props.blockDeleting && ({ sx: { display: "none" } } as any)}
                    >
                        <div>
                            <Button
                                onClick={() => setDeleteConfirmationDialog(true)} //
                                disabled={props.blockDeleting}
                                iconButton
                            >
                                <Delete></Delete>
                            </Button>
                        </div>
                    </Tooltip>
                </FlexBox>
            </Wrapper>
        </>
    );
};

export default SingleContentFieldControlHeader;
