// Tools
import dynamic from "next/dynamic";
import { prisma } from "@/prisma/db";
import { styled } from "@mui/system";
import SingleDestinationAPI from "@/utils/api/pages/destinations/SingleDestinationAPI";
// Types
import type { FunctionComponent } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { Destination } from "@/@types/pages/destinations/SingleDestination";
// Other components
import Head from "next/Head";
import Landing from "@/components/destinations/single/Landing";
import Description from "@/components/destinations/single/Description";
import Stats from "@/components/destinations/single/Stats";
const Stepper = dynamic(() => import("@/components/destinations/single/Stepper"));
import Landmarks from "@/components/destinations/single/Landmarks";
import Reviews from "@/components/destinations/single/Reviews";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setData, setRatings, setTotalReviews } from "@/redux/slices/singleDestination";
// Styled components
import RWDContentWrapper from "@/components/destinations/single/RWD";

const Content = styled("div")(({ theme }) => ({
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
    const { scrollY, width } = useAppSelector((state) => state.windowSizes);

    const dispatch = useAppDispatch();
    dispatch(setData(props.destination));
    dispatch(setRatings(props.ratings));
    dispatch(setTotalReviews(props.totalReviews));

    return (
        <>
            <Head>
                <title>{props.destination.city}</title>
            </Head>
            <RWDContentWrapper sx={{ color: "text.primary" }}>
                <Landing></Landing>
                {width > 1000 && <Stepper></Stepper>}
                <Content sx={{ "&::before": { opacity: scrollY ? 1 : 0 } }}>
                    <Stats></Stats>
                    <Description></Description>
                    <Landmarks></Landmarks>
                    <Reviews></Reviews>
                </Content>
            </RWDContentWrapper>
        </>
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

        return {
            props: await new SingleDestinationAPI(context.params.slug).main(),
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
