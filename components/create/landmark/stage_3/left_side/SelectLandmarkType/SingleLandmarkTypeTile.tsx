// Tools
import { styled, alpha } from "@mui/system";

export default styled("div")(({ theme }) => ({
    width: "90px",
    height: "90px",
    marginRight: "10px",
    marginBottom: "10px",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3rem",
    borderRadius: "5px",
    transition: "all .3s ease-in-out",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
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
