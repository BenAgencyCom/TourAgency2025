// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/Description";
import type { SplittedContentField } from "@/@types/Description";
// Material UI Components
import Tooltip from "@mui/material/Tooltip";
// Styled components
import Button from "@/components/create/_utils/forms/Button";

interface SingleContentFieldControlHeaderProps {
    field: ListItem<SplittedContentField>;
    refresh: () => void;
}

const SingleContentFieldControlHeader: FunctionComponent<SingleContentFieldControlHeaderProps> = (props) => {
    const { type: currentType } = props.field.data;

    const swapLeftWithRight = () => {
        if (currentType === FieldType.SPLITTED) {
            const { left, right, ...rest } = props.field.data;
            props.field.replace({
                left: right,
                right: left,
                ...rest,
            });
            props.refresh();
        }
    };

    return (
        <Tooltip title="Swap left and right sides" placement="top">
            <div>
                <Button sx={{ mr: "10px" }} onClick={swapLeftWithRight}>
                    Swap
                </Button>
            </div>
        </Tooltip>
    );
};

export default SingleContentFieldControlHeader;
