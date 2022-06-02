import type { SxProps } from "@mui/system";

export default {
    ".single-destination": {
        ["@media (min-width:1341px)"]: {
            width: "calc((100% - 40px)/ 3)",
            "&:nth-of-type(1),&:nth-of-type(4),&:nth-of-type(7),&:nth-of-type(10),&:nth-of-type(13),&:nth-of-type(16),&:nth-of-type(19),&:nth-of-type(22),&:nth-of-type(25),&:nth-of-type(28)": {
                marginLeft: "0px",
            },
        },
        ["@media (max-width:1340px)"]: {
            width: "calc((100% - 40px)/ 2)",
            "&:nth-of-type(1),&:nth-of-type(3),&:nth-of-type(5),&:nth-of-type(7),&:nth-of-type(9),&:nth-of-type(11),&:nth-of-type(13),&:nth-of-type(15),&:nth-of-type(17),&:nth-of-type(19)": {
                marginLeft: "0px",
            },
        },
        ["@media (max-width:900px)"]: {
            width: "100%",
            margin: "60px 0 0 0",
            ",&:nth-of-type(1)": {
                marginTop: "0px",
            },
            ".single-landmark-picture": {
                height: "500px",
            },
        },
    },
} as SxProps;
