import { styled } from "@mui/system";

export default styled("h4")(({ theme }) => ({
    fontWeight: 700,
    letterSpacing: "-1px",
    fontSize: "2rem",
    margin: "0 0 5px 0",
    position: "relative",
    paddingLeft: "20px",
    "&::after": {
        content: "''",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%) rotate(45deg)",
        left: "0px",
        borderRadius: "2px",
        width: "10px",
        height: "10px",
        border: `2px solid ${theme.palette.primary.main}`,
    },
}));
