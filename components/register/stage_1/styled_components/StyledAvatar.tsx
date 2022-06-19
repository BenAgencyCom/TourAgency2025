// Tools
import { styled } from "@mui/system";
// Material UI Components
import Avatar from "@mui/material/Avatar";

export default styled(Avatar)(({ theme }) => ({
    width: "600px",
    height: "600px",
    "#avatar-icon-placeholder": {
        fontSize: "30rem",
        opacity: 0.5,
    },
    ["@media (max-width:1600px)"]: {
        width: "550px",
        height: "550px",
    },
    ["@media (max-width:1500px)"]: {
        width: "500px",
        height: "500px",
    },
    ["@media (max-width:1200px)"]: {
        width: "430px",
        height: "430px",
    },
    ["@media (max-width:1000px)"]: {
        marginBottom: "40px",
    },
    ["@media (max-width:500px)"]: {
        width: "410px",
        height: "410px",
    },
    ["@media (max-width:450px)"]: {
        width: "390px",
        height: "390px",
    },
    ["@media (max-width:410px)"]: {
        width: "370px",
        height: "370px",
    },
    ["@media (max-width:390px)"]: {
        width: "350px",
        height: "350px",
    },
    ["@media (max-width:370px)"]: {
        width: "330px",
        height: "330px",
    },
    ["@media (max-width:350px)"]: {
        width: "310px",
        height: "310px",
    },
    ["@media (max-width:330px)"]: {
        width: "290px",
        height: "290px",
    },
}));
