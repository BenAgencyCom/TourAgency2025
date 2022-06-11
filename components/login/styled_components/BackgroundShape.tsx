// Tools
import { styled, keyframes } from "@mui/system";
import { fadeIn } from "@/components/_utils/styled/keyframes";

const rotateAnimation = keyframes({
    "0%": {
        transform: "rotate(0deg) scale(1)",
    },
    "50%": {
        transform: "rotate(180deg) scale(1.05)",
    },
    "100%": {
        transform: "rotate(360deg) scale(1)",
    },
});

export default styled("span")(({ theme }) => ({
    ["@media (min-width:800px)"]: {
        position: "absolute",
        marginTop: "50px",
        borderRadius: "50%",
        border: `30px solid ${theme.palette.primary.main}`,
        transformOrigin: "center",

        "&::after": {
            content: "''",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%) rotate(10deg)",
            width: "120%",
            height: "100px",
            background: theme.palette.background.lightPaper,
        },
        "&:nth-of-type(1)": {
            left: "calc(50% - 400px)",
            top: "calc(50% - 300px)",
            width: "800px",
            height: "800px",
            animation: `${rotateAnimation} 5s linear infinite, ${fadeIn} 1s .6s both linear`,
        },
        "&:nth-of-type(2)": {
            width: "1000px",
            height: "1000px",
            left: "calc(50% - 500px)",
            top: "calc(50% - 400px)",
            animation: `${rotateAnimation} 5s linear infinite reverse, ${fadeIn} 1s 1s both linear`,
        },
    },
}));
