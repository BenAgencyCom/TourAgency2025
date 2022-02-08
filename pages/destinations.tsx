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
// Styled COmponents
const SingleDestinaion = styled(Box)(({ theme }) => ({
    background: "red",
}));
interface DestinationsProps {
    destinations: Destination[];
}

const Destinations: FunctionComponent<DestinationsProps> = (props) => {
    return (
        <Container sx={{ mt: "100px", color: "text.primary" }}>
            {props.destinations.map((item) => {
                return (
                    <SingleDestinaion key={item.slug} sx={{ mb: 2 }}>
                        <Typography variant="h3">{`${item.city}, ${item.country}`}</Typography>
                        <Typography variant="h5">{`Landmarks: ${item._count.landmarks}`}</Typography>

                        <Button variant="contained" sx={{ width: 300, mt: 2 }}>
                            <Link href={`./destinations/${item.slug}`} passHref>
                                Visit
                            </Link>
                        </Button>
                    </SingleDestinaion>
                );
            })}
        </Container>
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
