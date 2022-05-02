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
import URLQueriesManager from "@/components/_utils/URLQueriesManager";
import ContentContainter from "@/components/_utils/styled/ContentContainter";

interface DestinationsProps {
    destinations: Destination[];
}

const Destinations: FunctionComponent<DestinationsProps> = (props) => {
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
                            sx: {
                                width: "250px",
                            },
                        },
                    ]}
                ></URLQueriesManager>
                {/*  */}
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
