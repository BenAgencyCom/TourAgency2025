// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
const DestinationWrapper: FunctionComponent = () => {
    const { description, folder } = useAppSelector((state) => state.singleDestination.data);

    const imageLoader = (url: string): string => `/upload/destinations/${folder}/description/${url}/1080p.jpg`;

    return (
        <Wrapper>
            <Container sx={{ pt: "100px" }}>
                <SingleDestinationContent
                    data={description} //
                    imageLoader={imageLoader}
                ></SingleDestinationContent>
            </Container>
        </Wrapper>
    );
};

export default DestinationWrapper;
