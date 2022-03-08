// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
import SingleStat from "./SingleStat";
// Styled components
const Wrapper = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.xl,
    width: "100vw",
    margin: "50px auto",
    userSelect: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));

const Stats: FunctionComponent = () => {
    const stats = [
        {
            top: "Population",
            middle: 1000,
            bottom: (
                <span>
                    Europe average: <strong>400</strong>
                </span>
            ),
        },
        {
            top: "Landmarks",
            middle: 3,
            bottom: (
                <span>
                    Poland average: <strong>2</strong>
                </span>
            ),
        },
        {
            top: "Score",
            middle: "78/100",
            bottom: (
                <span>
                    Based on <strong>143</strong> reviews
                </span>
            ),
            hideDivider: true,
        },
    ];

    return (
        <UnfadeOnScroll animationRatio={0.5}>
            <Wrapper>
                {stats.map((item, index) => {
                    return (
                        <SingleStat
                            key={index} //
                            top={item.top}
                            middle={item.middle}
                            bottom={item.bottom}
                            hideDivider={item?.hideDivider}
                        ></SingleStat>
                    );
                })}
            </Wrapper>
        </UnfadeOnScroll>
    );
};

export default Stats;
