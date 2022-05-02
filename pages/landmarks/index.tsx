// Types
import type { FunctionComponent } from "react";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";
// Other components
import Head from "next/Head";
// Material UI Icons
import Flag from "@mui/icons-material/Flag";
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
