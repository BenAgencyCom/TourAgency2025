// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

type Color = "success" | "error" | "warning";
const Wrapper = styled(FlexBox)<{ color: Color }>(({ theme, ...props }) => ({
    width: "90px",
    alignSelf: "stretch",
    fontSize: "3rem",
    fontWeight: 900,
    background: theme.palette[props.color].main,
    borderRadius: 3,
    color: "#fff",
}));
interface ScoreProps {
    points: number;
}

const Score: FunctionComponent<ScoreProps> = ({ points }) => {
    const color = (): Color => {
        if (points > 7.5) return "success";
        else if (points > 4.5) return "warning";
        return "error";
    };

    return (
        <Wrapper center color={color()}>
            <span>{points}</span>
        </Wrapper>
    );
};

export default Score;
