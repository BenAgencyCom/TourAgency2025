import { styled } from "@mui/system";

export default styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: "200px 0 100px 0",
    ["@media (max-width:1000px)"]: {
        flexDirection: "column",
        button: {
            marginTop: "20px",
        },
        h2: {
            textAlign: "center",
        },
    },
    ["@media (max-width:800px)"]: {
        margin: "100px 0 50px 0",
        h2: {
            fontSize: "3.5rem",
            lineHeight: "50px",
        },
    },
    ["@media (max-width:600px)"]: {
        h2: {
            padding: "0 10px",
        },
    },
    ["@media (max-width:500px)"]: {
        h2: {
            fontSize: "3rem",
            lineHeight: "40px",
        },
    },
}));
