// Tools
import { styled } from "@mui/system";
import useWindowSizes from "@/hooks/useWindowSizes";
// Types
import type { FunctionComponent } from "react";
// Other components
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
import SingleStat from "./SingleStat";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Wrapper = styled(FlexBox)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.xl,
    width: "100vw",
    margin: "50px auto",
    userSelect: "none",
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
    const { width } = useWindowSizes();

    return (
        <UnfadeOnScroll>
            <Wrapper horizontal="between" vertical="center" id="destination-general-stats">
                {stats.map((item, index) => {
                    return (
                        <SingleStat
                            key={index} //
                            top={item.top}
                            middle={item.middle}
                            bottom={item.bottom}
                            hideDivider={width < 700 || item?.hideDivider}
                        ></SingleStat>
                    );
                })}
            </Wrapper>
        </UnfadeOnScroll>
    );
};

export default Stats;
