// Tools
import { styled } from "@mui/system";
import { useRef } from "react";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import SingleDestinationContent from "@/components/destinations/single/description/SingleDestinationContent";
import SectionHeader from "@/components/destinations/single/SectionHeader";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled Components
const Wrapper = styled(Box)({
    width: "100%",
    background: `linear-gradient(180deg, #121212 0%, #1B2134 100%);`,
    paddingBottom: "100px",
});
const Container = styled(Box)(({ theme }) => ({
    width: "100vw",
    maxWidth: theme.breakpoints.values.lg,
    margin: "0 auto",
}));
const DestinationWrapper: FunctionComponent = () => {
    const { description, folder, country } = useAppSelector((state) => state.singleDestination.data);

    const containerElement = useRef<HTMLElement | null>(null);
    const imageLoader = (url: string): string => `/upload/destinations/${folder}/description/${url}/1080p.jpg`;

    return (
        <Wrapper component="section">
            <Container ref={containerElement}>
                <SectionHeader
                    header="WORDS OF INTRODUCTION" //
                    buttonMsg={`More in ${country}`}
                    onClick={() => {}}
                ></SectionHeader>

                <SingleDestinationContent
                    data={description} //
                    imageLoader={imageLoader}
                ></SingleDestinationContent>
            </Container>
        </Wrapper>
    );
};

export default DestinationWrapper;
