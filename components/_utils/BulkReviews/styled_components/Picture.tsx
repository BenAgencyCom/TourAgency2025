// Tools
import { styled } from "@mui/system";

export default styled("div")(({ theme }) => ({
    width: "700px",
    position: "relative",
    borderRadius: "0px 50px 0px 50px",
    overflow: "hidden",
    height: "550px",
    ["@media (max-width:1700px)"]: {
        width: "600px",
    },
    ["@media (max-width:1400px)"]: {
        width: "500px",
        height: "450px",
    },
    ["@media (max-width:1200px)"]: {
        width: "100%",
        marginBottom: "20px",
        minHeight: "auto",
        height: "550px",
    },
    ["@media (max-width:1000px)"]: {
        height: "500px",
        borderRadius: "5px",
    },
    ["@media (max-width:600px)"]: {
        height: "400px",
    },
    ["@media (max-width:450px)"]: {
        height: "300px",
    },
}));
