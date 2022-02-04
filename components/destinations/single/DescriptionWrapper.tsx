// Tools
import { styled } from "@mui/system";
import { useRef, useEffect } from "react";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import SingleDestinationContent from "@/components/destinations/single/description/SingleDestinationContent";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled Components
const Wrapper = styled(Box)({
    width: "100%",
    background: `linear-gradient(180deg, #121212 0%, #1B2134 100%);`,
    paddingBottom: "100px",
});
const Container = styled(Box)({
    paddingTop: "100px",
    width: "100vw",
    maxWidth: "1200px",
    margin: "0 auto",
});
const DestinationWrapper: FunctionComponent = () => {
    const { description, folder } = useAppSelector((state) => state.singleDestination.data);
    const { height } = useAppSelector((state) => state.windowSizes);

    const containerElement = useRef<HTMLElement | null>(null);
    const imageLoader = (url: string): string => `/upload/destinations/${folder}/description/${url}/1080p.jpg`;

    useEffect(() => {
        const height34th = (height * 3) / 4; // three forthth
        const height13td = height / 3; // one third

        window.addEventListener("scroll", () => {
            if (containerElement.current) {
                const ratio = Math.min(((scrollY - height13td) * 2) / height34th, 1);
                containerElement.current.style.opacity = `${ratio}`;
            }
        });
    });

    return (
        <Wrapper component="section">
            <Container ref={containerElement}>
                <SingleDestinationContent
                    data={description} //
                    imageLoader={imageLoader}
                ></SingleDestinationContent>
            </Container>
        </Wrapper>
    );
};

export default DestinationWrapper;
