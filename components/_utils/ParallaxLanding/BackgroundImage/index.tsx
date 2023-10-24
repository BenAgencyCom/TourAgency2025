// Tools
import { useRef, useEffect, useState } from "react";
// Types
import type { ImageURLs } from "../@types";
import type { FunctionComponent } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other Components
import Image from "next/image";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
import { BackgroundImageWrapper, GradientMask, LoadingHiddingMask, ScrollingMask } from "./styled_components";

interface BackgroundImageProps {
    imagesURLs: ImageURLs;
}

const BackgroundImage: FunctionComponent<BackgroundImageProps> = (props) => {
    const { scrollY } = useAppSelector((state) => state.windowSizes);
    const scrollingMaskElement = useRef<HTMLElement | null>(null);
    const [renderLoadingHiddingMask, setRenderLoadingHiddingMask] = useState<boolean>(true);
    // After component mount
    useEffect(() => {
        let isMounted = true;
        setTimeout(() => {
            if (isMounted) setRenderLoadingHiddingMask(false);
        }, 2000);
        return () => {
            isMounted = false;
        };
    }, []);
    // Watch te scroll property and update the opacity
    useEffect(() => {
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
                if (renderLoadingHiddingMask) return <LoadingHiddingMask id="loading-mask"></LoadingHiddingMask>;
            })()}

            <Fade in={true}>
                <BackgroundImageWrapper>
                    <Image
                        alt="background" //
                        src={props.imagesURLs.highResolution}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        placeholder="blur"
                        blurDataURL={props.imagesURLs.lowResolution}
                    ></Image>
                </BackgroundImageWrapper>
            </Fade>

            <GradientMask></GradientMask>
            <ScrollingMask ref={scrollingMaskElement}></ScrollingMask>
        </>
    );
};

export default BackgroundImage;
