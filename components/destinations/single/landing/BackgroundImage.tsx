// Tools
import { styled, alpha } from "@mui/system";
import { useRef, useEffect, useState } from "react";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Other Components
import Image from "next/Image";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
const BackgroundImageWrapper = styled(Box)({
    width: "100%",
    height: "100%",
    position: "relative",
    transitionDelay: "500ms !important",
    transitionDuration: "1000ms !important",
});
const GradientMask = styled(Box)({
    position: "absolute",
    zIndex: 1,
    top: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(180deg, ${alpha("#121212", 0.1)} 0%, ${alpha("#121212", 0.2)} 41.46%, ${alpha("#121212", 0.627299)} 72.19%, #121212 100%)`,
    backdropFilter: "blur(5px)",
});
const LoadingHiddingMask = styled(Box)({
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    background: "#000",
    zIndex: -1,
});
const ScrollingMask = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    background: theme.palette.background.paper,
    zIndex: 3,
    opacity: 0,
}));

const BackgroundImage: FunctionComponent = () => {
    const { folder } = useAppSelector((state) => state.singleDestination.data);
    const { scrollY } = useAppSelector((state) => state.windowSizes);

    const scrollingMaskElement = useRef<HTMLElement | null>(null);
    const [renderLoadingHiddingMask, setRenderLoadingHiddingMask] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setRenderLoadingHiddingMask(false), 2000);
        if (scrollingMaskElement.current) {
            const height = scrollingMaskElement.current.getBoundingClientRect().height;
            const ratio = Math.min(((scrollY - 100) * 1.6) / height, 1);
            const zIndex = ratio < 0.15 ? -1 : 3;
            scrollingMaskElement.current.style.zIndex = `${zIndex}`;
            scrollingMaskElement.current.style.opacity = `${zIndex === -1 ? 0 : ratio}`;
        }
    }, [scrollY]);
    return (
        <>
            {(() => {
                if (renderLoadingHiddingMask) return <LoadingHiddingMask></LoadingHiddingMask>;
            })()}

            <Fade in={true}>
                <BackgroundImageWrapper>
                    <Image
                        alt="background" //
                        src={`/upload/destinations/${folder}/thumbnail/1080p.jpg`}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        placeholder="blur"
                        blurDataURL={`/upload/destinations/${folder}/thumbnail/360p.jpg`}
                    ></Image>
                </BackgroundImageWrapper>
            </Fade>

            <GradientMask></GradientMask>
            <ScrollingMask ref={scrollingMaskElement}></ScrollingMask>
        </>
    );
};

export default BackgroundImage;
