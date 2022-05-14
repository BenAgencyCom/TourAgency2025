// Tools
import { styled } from "@mui/system";
// Styled components
import ContentContainter from "@/components/_utils/styled/ContentContainter";

export default styled(ContentContainter)(({ theme }) => ({
    margin: "0 !important",
    // RWD
    "#destination-general-stats": {
        //
        ["@media (max-width:1000px)"]: {
            h5: {
                fontSize: "4rem",
                lineHeight: "70px",
            },
        },
        //
        ["@media (max-width:800px)"]: {
            h5: {
                fontSize: "3rem",
                lineHeight: "55px",
            },
            h6: {
                fontSize: "1rem",
            },
        },
        //
        ["@media (max-width:700px)"]: {
            flexDirection: "column",
            ".single-stat": {
                marginTop: "50px",
                width: "100%",
                "&:nth-of-type(1)": {
                    marginTop: "0px",
                },
            },
            h5: {
                fontSize: "4rem",
                lineHeight: "70px",
            },
        },
    },
}));
