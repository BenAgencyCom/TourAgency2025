// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { ScoreColor, Review } from "@/@types/pages/SingleDestination";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Wrapper = styled(FlexBox)<{ color: ScoreColor }>(({ theme, ...props }) => ({
    width: "90px",
    alignSelf: "stretch",
    fontSize: "3rem",
    fontWeight: 900,
    background: theme.palette[props.color].main,
    borderRadius: 3,
    color: "#fff",
}));
interface ScoreProps {
    color: ScoreColor;
    points: Review["points"];
}

const Score: FunctionComponent<ScoreProps> = (props) => {
    return (
        <Wrapper center color={props.color}>
            <span>{props.points}</span>
        </Wrapper>
    );
};

export default Score;
