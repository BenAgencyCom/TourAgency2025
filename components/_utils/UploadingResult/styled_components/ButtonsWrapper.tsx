// Tools
import { styled, alpha } from "@mui/system";
// Styled components
export default styled("div", {
    shouldForwardProp: (propName: string) => !["status"].includes(propName),
})<{ status: "success" | "error" }>(({ theme, ...props }) => {
    const background = props.status === "error" ? theme.palette.error.main : theme.palette.success.main;

    return {
        display: "flex",
        marginTop: "20px",
        ".element": {
            marginLeft: "10px",
            "&:nth-of-type(1)": {
                marginLeft: "0",
            },
        },
        "button, a": {
            fontSize: "1rem",
            marginLeft: "10px",
            background,
            color: "#fff",
            padding: "0 20px",
            height: "32px",
            borderRadius: "3px",
            transition: "background .3s",
            "&:nth-of-type(1)": {
                marginLeft: "0",
            },
            "&:hover": {
                background: alpha(background, 0.8),
            },
        },
    };
});
