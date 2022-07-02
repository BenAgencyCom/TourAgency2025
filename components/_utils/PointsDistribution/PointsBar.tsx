// Tools
import { styled, alpha } from "@mui/system";
import getColorBasedOnType from "@/utils/client/getColorBasedOnType";
import { KeyframeScaleX } from "@/components/_utils/styled/keyframes";
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
    strong: {
        color: theme.palette.text.primary,
    },
}));

const Bar = styled("div", {
    shouldForwardProp: (prop: string) => !["ratio", "unfold", "type"].includes(prop),
})<{ ratio: number; type: ReviewType }>(({ theme, ...props }) => ({
    width: "100%",
    height: "5px",
    background: alpha(theme.palette.text.primary, 0.1),
    position: "relative",
    "&::after": {
        content: "''",
        position: "absolute",
        height: "100%",
        width: `${props.ratio}%`,
        background: getColorBasedOnType(props.type),
        left: "0",
        animation: `${KeyframeScaleX} 1s ease-in-out .5s both`,
        transformOrigin: "left",
    },
}));

interface PointsBarProps {
    type: ReviewType;
    pointsDistribution: PointsDistribution;
    predominant: ReviewType | "NO_SCORE";
}

const PointsBar: FunctionComponent<PointsBarProps> = (props) => {
    const { type, pointsDistribution, predominant } = props;

    const _computeRatio = () => Math.floor((pointsDistribution[type] * 100) / pointsDistribution[predominant as ReviewType]);
    const ratio: number = predominant === "NO_SCORE" ? 0 : _computeRatio();

    return (
        <Wrapper>
            <Bar ratio={ratio} type={type}></Bar>
            <Label>
                <span>{type.toLowerCase()}: </span>
                <strong>{pointsDistribution[type]}</strong>
            </Label>
        </Wrapper>
    );
};

export default PointsBar;
