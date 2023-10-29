// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Styled component
const SingleListPoint = styled("div")(({ theme }) => ({
    display: "flex",
    fontSize: "1.4rem",
    textTransform: "capitalize",
    marginBottom: "5px",
    strong: {
        marginLeft: "10px",
        color: theme.palette.primary.main,
        fontWeight: 900,
    },
}));

const ListPoint: FunctionComponent<{ label: string }> = (props) => {
    return (
        <SingleListPoint>
            <span className="label">{`${props.label}: `}</span>
            <strong>{props.children}</strong>
        </SingleListPoint>
    );
};

export default ListPoint;
