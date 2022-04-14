// Tools
import { useState } from "react";
import { styled, alpha } from "@mui/system";
import getColorBasedOnScore from "@/utils/client/getColorBasedOnScore";
// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
import type { PointsDistribution } from "@/@types/pages/api/ReviewsAPI";
// Styled components
const Wrapper = styled("div")(({ theme }) => ({
    marginBottom: "10px",
}));
const Label = styled("span")(({ theme, ...props }) => ({
    textTransform: "capitalize",
    userSelect: "none",
    letterSpacing: "1px",
    strong: {
        color: theme.palette.primary.main,
    },
}));

const Bar = styled("div", {
    shouldForwardProp: (prop: string) => !["ratio", "unfold", "type"].includes(prop),
})<{ ratio: number; type: ReviewType; unfold: boolean }>(({ theme, ...props }) => ({
    width: "100%",
    height: "5px",
    background: alpha(theme.palette.text.primary, 0.1),
    position: "relative",
    "&::after": {
        content: "''",
        position: "absolute",
        height: "100%",
        width: `${props.ratio}%`,
        background: getColorBasedOnScore(props.type),
        left: "0",
        transform: props.unfold ? "scaleX(1)" : "scaleX(0.1)",
        transition: "transform 1s ease-in-out",
        transformOrigin: "left",
    },
}));

interface PointsBarProps {
    type: ReviewType;
    pointsDistribution: PointsDistribution;
    predominant: ReviewType;
}

const PointsBar: FunctionComponent<PointsBarProps> = (props) => {
    const { type, pointsDistribution, predominant } = props;
    const ratio: number = Math.floor((pointsDistribution[type] * 100) / pointsDistribution[predominant]);
    const [unfold, setUnfold] = useState<boolean>(false);

    setTimeout(() => {
        setUnfold(true);
    }, 300);

    return (
        <Wrapper>
            <Bar ratio={ratio} type={type} unfold={unfold}></Bar>
            <Label>
                <span>{type.toLowerCase()}: </span>
                <strong>{pointsDistribution[type]}</strong>
            </Label>
        </Wrapper>
    );
};

export default PointsBar;
