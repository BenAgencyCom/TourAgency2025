// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { MUIStyledCommonProps } from "@mui/system";
// Styled Components
const CardBottomNavigationWrapperBase = styled("div")(({ theme }) => ({
    width: "100%",
    display: "flex",
    a: {
        marginRight: "10px",
    },

    ["@media (max-width:1000px)"]: {
        a: {
            width: "200px",
            marginTop: "20px",
        },
    },
    ["@media (max-width:900px)"]: {
        a: {
            width: "200px",
            marginTop: "20px",
        },
    },
    ["@media (max-width:500px)"]: {
        flexDirection: "column",
        marginTop: "20px",
        a: {
            width: "100%",
            margin: "10px 0 0 0 !important",
        },
    },
}));

const CardBottomNavigationWrapper: FunctionComponent<MUIStyledCommonProps> = (props) => {
    return (
        <CardBottomNavigationWrapperBase>
            {props.children} {/*  */}
        </CardBottomNavigationWrapperBase>
    );
};

export default CardBottomNavigationWrapper;
