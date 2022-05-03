// Tools
import { useState } from "react";
import axios from "axios";
// Types
import type { FunctionComponent } from "react";
import type { Continent, LandmarkType } from "@prisma/client";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";
// Other components
import Head from "next/Head";
// Material UI Icons
import Public from "@mui/icons-material/Public";
import AccountBalance from "@mui/icons-material/AccountBalance";
// Styled COmponents
import FlexBox from "@/components/_utils/styled/FlexBox";
import URLQueriesManager from "@/components/_utils/URLQueriesManager";
import ContentContainter from "@/components/_utils/styled/ContentContainter";

interface DestinationsProps {
    destinations: Destination[];
}

const Destinations: FunctionComponent<DestinationsProps> = (props) => {
    const [response, setResponse] = useState<any>(null);

    const queryForData = async (urlQueries: string) => {
        const res = await axios.get(`/api/landmark/bulk${urlQueries}`);
        setResponse(res.data);
    };

    return (
        <>
            <Head>
                <title>Landmarks to Discover</title>
            </Head>

            <ContentContainter
                id="landmarks-wrapper" //
                sx={{ minHeight: "1000px", pt: "40px" }}
                backgroundMap
                header={{
                    background: "Landmarks",
                    main: "Places worth to see",
                }}
            >
                <URLQueriesManager
                    queryForData={queryForData}
                    searchingPhrase
                    extraSelects={[
                        {
                            key: "certainLandmarkType",
                            icon: <AccountBalance />,
                            options: [
                                { label: "All types", value: "ALL" }, //
                                { label: "Antique", value: "ANTIQUE" }, //
                                { label: "Art", value: "ART" }, //
                                { label: "Building", value: "BUILDING" }, //
                                { label: "Monument", value: "MONUMENT" }, //
                                { label: "Nature", value: "NATURE" }, //
                                { label: "Relic", value: "RELIC" }, //
                                { label: "Restaurant", value: "RESTAURANT" }, //
                            ] as { label: string; value: LandmarkType | "ALL" }[],
                            defaultValue: "ALL",
                            omitIfDeafult: true,
                        },
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
                                width: "250px",
                            },
                        },
                    ]}
                    paginationProperties={{
                        currentPage: 2,
                        pagesInTotal: 5,
                        perPage: 3,
                        recordsInTotal: 10,
                        idOfElementToScrollTo: "landmarks-wrapper",
                    }}
                >
                    <FlexBox>
                        <span>{JSON.stringify(response)}</span>
                    </FlexBox>
                </URLQueriesManager>
            </ContentContainter>
        </>
    );
};

export default Destinations;

export const getStaticProps: GetStaticProps = (ctx: GetStaticPropsContext) => {
    return {
        props: {},
    };
};
