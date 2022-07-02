// Tools
import { styled } from "@mui/system";
// Styled components
export default styled("div", {
    shouldForwardProp: (propName: string) => {
        return !["current"].includes(propName);
    },
})<{ current: boolean }>(({ theme, ...props }) => ({
    width: "45px",
    height: "45px",
    borderRadius: "3px",
    margin: "0 5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: props.current ? theme.palette.primary.main : theme.palette.text.primary,
    color: "#fff",
    userSelect: "none",
    fontSize: "1.3rem",
    boxSizing: "border-box",
    ...(!props.current && {
        transition: "all .3s",
        border: `2px solid ${theme.palette.text.primary}`,
        cursor: "pointer",
        "&:hover": {
            color: theme.palette.text.primary,
            background: "#fff",
        },
    }),
    ["@media (max-width:800px)"]: {
        width: "40px",
        height: "40px",
        fontSize: "1.2rem",
    },
}));
