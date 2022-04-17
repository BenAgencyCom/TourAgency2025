// Tools
import { prisma } from "@/prisma/db";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { UpdateCurrentURLsQueries } from "@/components/destinations/bulk/utils/URLBuilder";
// Types
import type { FunctionComponent } from "react";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";
// Material UI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// Other components
import Link from "next/link";
import Head from "next/Head";
import Sort from "@/components/destinations/bulk/Sort";
// Styled COmponents
import ContentContainter from "@/components/_utils/styled/ContentContainter";
const SingleDestinaion = styled(Box)(({ theme }) => ({
    background: "red",
}));
interface DestinationsProps {
    destinations: Destination[];
}

const Destinations: FunctionComponent<DestinationsProps> = (props) => {
    const router = useRouter();

    const refreshData = async (pageNumber?: number) => {
        UpdateCurrentURLsQueries(router);
        console.log(router);
    };

    console.log(router.query);

    return (
        <>
            <Head>
                <title>Destinations</title>
            </Head>
            <ContentContainter>
                <Sort refreshData={refreshData}></Sort>
                <Box sx={{ mt: "35px" }}>
                    {props.destinations.map((item) => {
                        return (
                            <SingleDestinaion key={item.slug} sx={{ mb: 2 }}>
                                <Typography variant="h3">{`${item.city}, ${item.country}`}</Typography>

                                <Button variant="contained" sx={{ width: 300, mt: 2 }}>
                                    <Link href={`./destinations/${item.slug}`} passHref>
                                        Visit
                                    </Link>
                                </Button>
                            </SingleDestinaion>
                        );
                    })}
                </Box>
            </ContentContainter>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const destinations = await prisma.destination.findMany({
        select: {
            slug: true,
            city: true,
            country: true,
            population: true,
            continent: true,
            shortDescription: true,
            folder: true,
            _count: {
                select: {
                    landmarks: true,
                },
            },
        },
    });
    return {
        props: {
            destinations,
        },
    };
};

export default Destinations;
