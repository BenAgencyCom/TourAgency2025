// Tools
import { useState } from "react";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Other components
import VisibilitySensor from "react-visibility-sensor";
// Styled components

const UnfadeOnScrollElementWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    "&.fullsize": {
        width: "100%",
        height: "100%",
    },
    ["@media (min-width:1001px)"]: {
        opacity: 0,
        transform: "translateY(20px)",
        transition: "all .5s ease-in-out",
        "&.visible": {
            transform: "translateY(0px)",
            opacity: 1,
        },
    },
}));

interface UnfadeOnScrollProps {
    children: ReactNode;
    offsetTop?: number;
    offsetBottom?: number;
    fullSize?: true;
}

const UnfadeOnScroll: FunctionComponent<UnfadeOnScrollProps> = (props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [scrollDuringLatestChange, setScrollDuringLatestChange] = useState<number>(0);
    const changeVisibility = (visibility: boolean) => {
        const currentScroll = window.scrollY;
        if (scrollDuringLatestChange === currentScroll) return;
        setIsVisible(visibility);
        setScrollDuringLatestChange(currentScroll);
    };

    return (
        <VisibilitySensor
            onChange={changeVisibility} //
            offset={{
                top: props.offsetTop ?? 300,
                bottom: props.offsetBottom ?? 200,
            }}
            partialVisibility={true}
            intervalDelay={200}
        >
            <UnfadeOnScrollElementWrapper
                className={[isVisible ? "visible" : "", props.fullSize ? "fullsize" : ""].join(" ")} //
            >
                {props.children}
            </UnfadeOnScrollElementWrapper>
        </VisibilitySensor>
    );
};

export default UnfadeOnScroll;
