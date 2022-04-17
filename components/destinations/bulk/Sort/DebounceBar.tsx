// Tools
import { styled, keyframes } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Styled Components
const animation = keyframes({
    from: {
        width: "0%",
    },
    to: {
        width: "100%",
    },
});

interface BarParams {
    playAnimation: boolean;
    duration: number;
}

const Bar = styled("div", {
    shouldForwardProp: (prop: string) => !["duration", "playAnimation"].includes(prop),
})<BarParams>(({ theme, ...props }) => ({
    width: "100%",
    height: "5px",
    opacity: "1 !important",
    ...(props.playAnimation && {
        backgroundColor: theme.palette.primary.main,
        animation: `${animation} ${props.duration}ms linear`,
    }),
}));

const SearchingDelayBar: FunctionComponent<BarParams> = (props) => {
    return <Bar {...props}></Bar>;
};

export default SearchingDelayBar;
