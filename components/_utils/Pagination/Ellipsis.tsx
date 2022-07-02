// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { MUIStyledCommonProps } from "@mui/system";
// Styled Components
const EllipsisBase = styled("span")(({ theme }) => ({
    fontSize: "1.5rem",
    margin: "0 10px",
    userSelect: "none",
    cursor: "default",
    ["@media (max-width:600px)"]: {
        margin: "0 5px",
    },
}));

const Ellipsis: FunctionComponent<MUIStyledCommonProps> = (props) => {
    return <EllipsisBase>...</EllipsisBase>;
};

export default Ellipsis;
