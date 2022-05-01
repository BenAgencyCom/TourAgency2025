// Types
import type { FunctionComponent } from "react";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";
// Material UI Components
import Container from "@mui/material/Container";
// Other components
import Head from "next/Head";
// Material UI Icons
import Flag from "@mui/icons-material/Flag";

// Styled COmponents

import URLQueriesManager from "@/components/_utils/URLQueriesManager";

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
                <h1>Essa</h1>
                <URLQueriesManager
                    extraOrderOptions={[
                        { label: "Biggest", value: "biggest", "data-compounded-value": "orderBy=population&sort=desc" },
                        { label: "Smallest", value: "smallest", "data-compounded-value": "orderBy=population&sort=asc" },
                    ]}
                    extraSelects={[
                        {
                            key: "name",
                            icon: <Flag />,
                            options: [
                                { label: "kacper", value: "kacper_1" },
                                { label: "kacper 2", value: "kacper_2" },
                                { label: "kacper 3", value: "kacper_3" },
                            ],
                        },
                        {
                            key: "self_aggrandizement",
                            icon: <Flag />,
                            options: [
                                { label: "kacper jest super", value: "super_kacper_1" },
                                { label: "kacper jest super 2", value: "super_kacper_2" },
                                { label: "kacper jest super 3", value: "super_kacper_3" },
                            ],
                            sx: { width: "250px" },
                        },
                    ]}
                ></URLQueriesManager>
                {/*  */}
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
