// Tools
import { prisma } from "@/prisma/db";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import type { Destination } from "@/@types/pages/ManyDestinations";
// Material UI Components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// Other components
import Link from "next/link";
import Head from "next/Head";
// Styled COmponents
const SingleDestinaion = styled(Box)(({ theme }) => ({
    background: "red",
}));
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
