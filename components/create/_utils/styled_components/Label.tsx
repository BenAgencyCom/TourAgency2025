import { styled } from "@mui/system";

export default styled("h4")(({ theme }) => ({
    fontWeight: 700,
    fontSize: "1.8rem",
    margin: "0 0 10px 0",
    position: "relative",
    paddingLeft: "24px",
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
