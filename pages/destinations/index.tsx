// Tools
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
// Types
import type { FunctionComponent } from "react";
import type { Continent } from "@prisma/client";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";
// Other components
import Head from "next/head";
import ThereAreNoResults from "@/components/_utils/ThereAreNoResults";
import URLQueriesManager from "@/components/_utils/URLQueriesManager";
import SingleDestination from "@/components/destinations/bulk/SingleDestination";
import SingleDestinationSkeletonLoading from "@/components/destinations/bulk/SingleDestination/SkeletonLoading";
// Material UI Icons
import Public from "@mui/icons-material/Public";
// Styled Components
import ContentContainter from "@/components/_utils/styled/ContentContainter";

const Destinations: FunctionComponent = () => {
    const PER_PAGE = 4;

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);

    const queryForData = async (urlQueries: string) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/destination/bulk${urlQueries}&perPage=${PER_PAGE}`);
            if (res.data) {
                setPaginationProperties(res.data.pagination ?? null);
                setDestinations(res.data.data ?? []);
                setLoading(false);
            }
        } catch (e: unknown) {
            router.push("/500");
        }
    };

    return (
        <>
            <Head>
                <title>MES | Destinations</title>
            </Head>
            <ContentContainter
                id="destinations-wrapper" //
                sx={{ minHeight: "1000px", pt: "40px" }}
                backgroundMap
                header={{
                    main: "Explore the diversity of the World",
                    background: "Destinations",
                }}
            >
                <URLQueriesManager
                    queryForData={queryForData}
                    searchingPhrase
                    lineAnimationColor="paperDefault"
                    extraOrderOptions={[
                        {
                            label: "Biggest",
                            value: "biggest",
                            "data-compounded-value": "orderBy=population&sort=desc",
                        },
                        {
                            label: "Smallest",
                            value: "smallest",
                            "data-compounded-value": "orderBy=population&sort=asc",
                        },
                    ]}
                    extraSelects={[
                        {
                            key: "continent",
                            icon: <Public />,
                            options: [
                                { label: "All continents", value: "all" },
                                { label: "Europe", value: "Europe" },
                                { label: "North America", value: "North_America" },
                                { label: "South America", value: "South_America" },
                                { label: "Asia", value: "Asia" },
                                { label: "Australia", value: "Australia_Oceania" },
                                { label: "Africa", value: "Africa" },
                            ] as { label: string; value: Continent }[],
                            defaultValue: "all",
                            omitIfDeafult: true,
                            sx: {
                                width: "230px",
                            },
                        },
                    ]}
                    paginationProperties={
                        paginationProperties && !loading
                            ? {
                                  ...paginationProperties,
                                  idOfElementToScrollTo: "destinations-wrapper",
                              }
                            : undefined
                    }
                >
                    {(() => {
                        if (loading) {
                            return (
                                <>
                                    <br />
                                    <br />
                                    <br />
                                    <SingleDestinationSkeletonLoading></SingleDestinationSkeletonLoading>
                                    <SingleDestinationSkeletonLoading></SingleDestinationSkeletonLoading>
                                    <SingleDestinationSkeletonLoading></SingleDestinationSkeletonLoading>
                                    <SingleDestinationSkeletonLoading></SingleDestinationSkeletonLoading>
                                </>
                            );
                        } else {
                            if (destinations.length === 0) {
                                return (
                                    <ThereAreNoResults
                                        router={router} //
                                        header="There are no destinations"
                                        routerQueriesToHandle={[{ queryName: "certainLandmarkType", msg: (val: string) => `Of type ${val}` }]}
                                        searchingPhraseExplanation="title, country or city name"
                                    ></ThereAreNoResults>
                                );
                            } else {
                                return destinations.map((destination) => (
                                    <SingleDestination
                                        destination={destination} //
                                        key={destination.slug}
                                    ></SingleDestination>
                                ));
                            }
                        }
                    })()}
                </URLQueriesManager>
            </ContentContainter>
        </>
    );
};

export default Destinations;
