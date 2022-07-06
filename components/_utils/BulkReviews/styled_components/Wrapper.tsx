// Tools
import { styled } from "@mui/system";

export default styled("div")(({ theme }) => ({
    margin: "50px 0 100px 0",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    ["@media (max-width:1200px)"]: {
        flexDirection: "column-reverse",
    },
}));
