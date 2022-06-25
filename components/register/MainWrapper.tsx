// Tools
import { styled } from "@mui/system";
// Other components
import ContentContainter from "@/components/_utils/styled/ContentContainter";

export default styled(ContentContainter)(({ theme }) => ({
    paddingTop: "50px",
    marginBottom: "100px",
    display: "flex",
    minHeight: "calc(100vh - 200px)",
    ".content-wrapper": {
        display: "flex",
        flexGrow: 1,
        alignItems: "flex-start",
        justifyContent: "space-between",
        ["@media (max-width:1000px)"]: {
            flexDirection: "column-reverse",
            alignItems: "center",
        },
    },
    ".MuiFormControl-root ": {
        width: "100%",
        "input, select, .MuiSelect-select": {
            color: theme.palette.text.primary,
        },
        ".MuiInputLabel-root": {
            color: theme.palette.text.primary,
            padding: "0px 10px",
            borderRadius: "3px",
        },
    },
}));
