// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/Description";
// Material UI Icons
import Tooltip from "@mui/material/Tooltip";
// Material UI Icons
import Settings from "@mui/icons-material/Settings";
// Other components
import DescriptionFieldIcon from "@/components/create/_utils/forms/DescriptionFieldIcon";
// Styled components
import Button from "@/components/create/_utils/forms/Button";

const SplittedSubfieldHeaderBase = styled("header")(({ theme }) => ({
    display: "flex", //
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "16px",
    ["@media (max-width:450px)"]: {
        flexDirection: "column",
        alignItems: "flex-start",
        button: {
            marginTop: "20px",
        },
    },
}));

const Header = styled("h5")(({ theme }) => ({
    fontSize: "1.5rem",
    display: "flex",
    margin: "0",
    alignItems: "flex-end",
    fontWeight: "400",
    userSelect: "none",
    strong: {
        fontWeight: "700",
    },
    svg: {
        marginRight: "10px",
        fontSize: "2rem",
        color: theme.palette.primary.main,
    },
    ".primary": {
        color: theme.palette.primary.main,
    },
}));

interface SplittedSubfieldHeaderProps {
    fieldType: FieldType;
    openTypeChangeDialog: () => void;
    subFieldIndex: number;
}
//
const SplittedSubfieldHeader: FunctionComponent<SplittedSubfieldHeaderProps> = (props) => {
    const { fieldType, subFieldIndex, openTypeChangeDialog } = props;
    const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1).toLowerCase();

    return (
        <SplittedSubfieldHeaderBase>
            <Header>
                <DescriptionFieldIcon fieldType={fieldType} />
                <span>
                    Subfield <strong className="primary">{subFieldIndex + 1}</strong> / <strong>{capitalize(FieldType[fieldType])}</strong>
                </span>
            </Header>
            <Tooltip title="Change type" placement="top">
                <div>
                    <Button onClick={openTypeChangeDialog} iconButton>
                        <Settings></Settings>
                    </Button>
                </div>
            </Tooltip>
        </SplittedSubfieldHeaderBase>
    );
};

export default SplittedSubfieldHeader;
