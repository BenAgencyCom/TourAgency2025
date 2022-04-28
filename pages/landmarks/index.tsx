// Types
import type { FunctionComponent } from "react";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";
// Material UI Components
import Container from "@mui/material/Container";
// Other components
import Head from "next/Head";
// Styled COmponents

interface DestinationsProps {
    destinations: Destination[];
}

const Destinations: FunctionComponent<DestinationsProps> = (props) => {
    return (
        <>
            <Head>
                <title>Landmarks to Discover</title>
            </Head>

            <Container sx={{ mt: "100px", color: "text.primary" }}>
                {/*  */}
                <h1>Essa</h1>
            </Container>
        </>
    );
};

export default Destinations;

export const getStaticProps: GetStaticProps = (ctx: GetStaticPropsContext) => {
    return {
        props: {},
    };
};
