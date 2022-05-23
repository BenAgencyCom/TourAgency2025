// Tools
import { styled, alpha } from "@mui/system";

export default styled("div")(({ theme }) => ({
    width: "90px",
    height: "90px",
    marginRight: "10px",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3rem",
    borderRadius: "5px",
    transition: "all .3s ease-in-out",
    svg: {
        fontSize: "inherit",
    },
    cursor: "pointer",
    "&:hover": {
        background: alpha(theme.palette.text.primary, 0.1),
    },
    "&.selected": {
        background: theme.palette.primary.main,
        color: "#fff",
    },
}));
