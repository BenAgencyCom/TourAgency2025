// Tools
import { prisma } from "@/prisma/db";
import { styled } from "@mui/system";
import moment from "moment";
import prismaCertainProps from "@/utils/prismaCertinProps";
// Types
import type { GetStaticPaths, GetStaticProps } from "next";
import type { FunctionComponent } from "react";
import type { Destination, Landmark, Review } from "@/@types/pages/SingleDestination";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import Landing from "@/components/destinations/single/landing/Landing";
import Description from "@/components/destinations/single/description/Description";
import Stats from "@/components/destinations/single/stats/Stats";
import Stepper from "@/components/destinations/single/stepper/Stepper";
import Landmarks from "@/components/destinations/single/landmarks/Landmarks";
import Reviews from "@/components/destinations/single/reviews/Reviews";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setData, setRatings, setTotalReviews } from "@/redux/slices/singleDestination";
// Styled components
const Wrapper = styled(Box)(({ theme }) => ({
    width: "100vw",
    position: "relative",
}));
const Content = styled(Box)(({ theme }) => ({
    width: "100vw",
    position: "relative",
    marginTop: "100vh",
    paddingTop: "1px",
    background: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    "&::before": {
        content: "''",
        position: "absolute",
        top: "-20px",
        width: "100%",
        height: "50px",
        background: theme.palette.background.paper,
        transform: "rotate(-1deg)",
    },
}));

interface SingleDestinationProps {
    destination: Destination;
    ratings: number;
    totalReviews: number;
}

const SingleDestination: FunctionComponent<SingleDestinationProps> = (props) => {
    const { scrollY } = useAppSelector((state) => state.windowSizes);

    const dispatch = useAppDispatch();
    dispatch(setData(props.destination));
    dispatch(setRatings(props.ratings));
    dispatch(setTotalReviews(props.totalReviews));

    return (
        <Wrapper sx={{ color: "text.primary" }}>
            <Landing></Landing>
            <Stepper></Stepper>
            <Content sx={{ "&::before": { opacity: scrollY ? 1 : 0 } }}>
                <Stats></Stats>
                <Description></Description>
                <Landmarks></Landmarks>
                <Reviews></Reviews>
            </Content>
        </Wrapper>
    );
};

export default SingleDestination;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = (await prisma.destination.findMany({ select: { slug: true } })).map((item) => ({
        params: { slug: item.slug },
    }));
    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<{ destination: Destination }, { slug: string }> = async (context) => {
    try {
        if (!context?.params?.slug) throw new Error();

        const destination = await prisma.destination.findUnique({
            where: {
                slug: context.params.slug,
            },
            select: {
                ...prismaCertainProps<Destination>(["id", "slug", "city", "country", "population", "continent", "shortDescription", "description", "folder"]),
                landmarks: {
                    select: prismaCertainProps<Landmark>(["slug", "title", "picture", "type"]),
                },
                reviews: {
                    select: {
                        ...prismaCertainProps<Review>(["id", "review", "points", "createdAt"]),
                        reviewer: {
                            select: prismaCertainProps<Review["reviewer"]>(["id", "name", "surname", "country", "countryCode", "gender", "avatar", "birth"]),
                        },
                    },
                },
            },
        });
        if (!destination) throw new Error();

        destination.reviews = destination.reviews.map((review) => {
            (review.createdAt as any) = moment(review.createdAt).format("YYYY-MM-DD HH:mm:ss");
            (review.reviewer as any).birth = moment().diff(moment(review.reviewer.birth).format("DD-MM-YYYY"), "years");
            return review;
        });

        const ratings = await prisma.destinationReview.aggregate({
            where: {
                destinationId: destination.id,
            },
            _avg: {
                points: true,
            },
            _count: {
                _all: true,
            },
        });

        return {
            props: {
                destination: destination as unknown as Destination,
                ratings: (ratings._avg.points as any).toFixed(2),
                totalReviews: ratings._count._all,
            },
        };
    } catch (e: unknown) {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }
};
