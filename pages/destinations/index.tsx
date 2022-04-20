// Tools
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import FetchData from "@/components/destinations/bulk/utils/FetchData";
import { UpdateCurrentURLsQueries } from "@/components/destinations/bulk/utils/URLBuilder";
// Types
import type { FunctionComponent } from "react";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import Head from "next/Head";
import Sort from "@/components/destinations/bulk/Sort";
import LandingHeader from "@/components/destinations/bulk/LandingHeader";
import SingleDestination from "@/components/destinations/bulk/SingleDestination";
import Pagination from "@/components/_utils/Pagination";
// Styled Components
import Loading from "@/components/_utils/Loading";
import ContentContainter from "@/components/_utils/styled/ContentContainter";

const Destinations: FunctionComponent = (props) => {
    const PER_PAGE = 4;

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);

    const refreshData = async (pageNumber?: number) => {
        // Smooth scrolling, trick with fixing height
        const element = document.getElementById("destinations-wrapper");
        if (element) {
            const setMinHeight = (px: number) => ((element as HTMLElement).style.minHeight = `${px}px`);
            const minHeight = element.getBoundingClientRect().height;
            setMinHeight(minHeight);
            // Reverse temporary changes
            setTimeout(() => setMinHeight(0), 1000);
        }
        //
        if (pageNumber) router.query.page = String(pageNumber);
        setLoading(true);
        UpdateCurrentURLsQueries(router);
        const result = await FetchData({ router, perPage: PER_PAGE });
        if (result) {
            setDestinations(result.destinations);
            setPaginationProperties(result.paginationProperties);
        }
        setLoading(false);
    };

    useEffect(() => {
        let isMounted = true;
        (async () => {
            // Wait until router.query will have been fully loaded
            if (Object.keys(router.query).length === 0) await new Promise((resolve) => setTimeout(resolve, 300));

            const result = await FetchData({ router, perPage: PER_PAGE });
            if (isMounted && result) {
                setDestinations(result.destinations);
                setPaginationProperties(result.paginationProperties);
                setLoading(false);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [router]);

    return (
        <>
            <Head>
                <title>Destinations</title>
            </Head>
            <ContentContainter id="destinations-wrapper" sx={{ minHeight: "1000px", pt: "40px" }} backgroundMap>
                <LandingHeader></LandingHeader>
                <Sort refreshData={refreshData}></Sort>

                <Box sx={{ mt: "35px", position: "relative" }}>
                    {(() => {
                        if (loading) {
                            return <Loading sx={{ mt: "200px" }}></Loading>;
                        } else {
                            return destinations.map((destination) => (
                                <SingleDestination
                                    destination={destination} //
                                    key={destination.slug}
                                ></SingleDestination>
                            ));
                        }
                    })()}
                    {(() => {
                        if (paginationProperties && paginationProperties.pagesInTotal > 1 && !loading) {
                            return (
                                <Pagination
                                    paginationProperties={paginationProperties} //
                                    scrollToElement="destinations-wrapper"
                                    callbackDuringScrolling={refreshData}
                                ></Pagination>
                            );
                        }
                    })()}
                </Box>
            </ContentContainter>
        </>
    );
};

export default Destinations;
