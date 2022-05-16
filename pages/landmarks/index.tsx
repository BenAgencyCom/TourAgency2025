// Tools
import axios from "axios";
import { useState } from "react";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
// Types
import type { FunctionComponent } from "react";
import type { Continent, LandmarkType } from "@prisma/client";
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Other components
import Head from "next/Head";
// Material UI Icons
import Public from "@mui/icons-material/Public";
import AccountBalance from "@mui/icons-material/AccountBalance";
// Other components
import SingleLandmark from "@/components/_utils/SingleLandmark";
import ThereAreNoResults from "@/components/_utils/ThereAreNoResults";
import URLQueriesManager from "@/components/_utils/URLQueriesManager";
import SkeletonLoading from "@/components/_utils/SingleLandmark/SkeletonLoading";
// Styled Components
import ContentContainter from "@/components/_utils/styled/ContentContainter";
import Loading from "@/components/_utils/Loading";

const LandmarksWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    minHeight: "1000px",
}));

const BulkLandmarks: FunctionComponent = () => {
    const PER_PAGE = 12;

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [landmarks, setLandmarks] = useState<Landmark[]>([]);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);

    const queryForData = async (urlQueries: string) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/landmark/bulk${urlQueries}&perPage=${PER_PAGE}`);
            if (res.data) {
                setPaginationProperties(res.data.pagination ?? null);
                setLandmarks(res.data.data ?? []);
                setLoading(false);
            }
        } catch (e: unknown) {
            router.push("/500");
        }
    };

    return (
        <>
            <Head>
                <title>Landmarks to Discover</title>
            </Head>

            <ContentContainter
                id="landmarks-wrapper" //
                sx={{ pt: "40px" }}
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
                                { label: "All types", value: "ALL" },
                                { label: "Antique", value: "ANTIQUE" },
                                { label: "Art", value: "ART" },
                                { label: "Building", value: "BUILDING" },
                                { label: "Monument", value: "MONUMENT" },
                                { label: "Museum", value: "MUSEUM" },
                                { label: "Nature", value: "NATURE" },
                                { label: "Restaurant", value: "RESTAURANT" },
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
                    paginationProperties={
                        paginationProperties && !loading
                            ? {
                                  ...paginationProperties,
                                  idOfElementToScrollTo: "landmarks-wrapper",
                              }
                            : undefined
                    }
                >
                    <LandmarksWrapper>
                        {(() => {
                            if (loading) {
                                return (
                                    <>
                                        {/* in order to make some phony margin */}
                                        <div style={{ height: "100px", width: "100%" }} />
                                        <SkeletonLoading sx={{ display: "none" }} />
                                        <SkeletonLoading sx={{ display: "none" }} />
                                        <SkeletonLoading />
                                        <SkeletonLoading />
                                        <SkeletonLoading />
                                        <SkeletonLoading />
                                        <SkeletonLoading />
                                        <SkeletonLoading />
                                    </>
                                );
                            } else {
                                if (landmarks.length === 0) {
                                    return (
                                        <ThereAreNoResults
                                            router={router} //
                                            header="There are no landmarks"
                                            routerQueriesToHandle={[{ queryName: "certainLandmarkType", msg: (val: string) => `Of type ${val}` }]}
                                            searchingPhraseExplanation="title, country or city name"
                                        ></ThereAreNoResults>
                                    );
                                } else {
                                    return landmarks.map((item, index) => {
                                        return (
                                            <SingleLandmark
                                                key={item.slug} //
                                                data={item}
                                                imageResolution="360p"
                                            ></SingleLandmark>
                                        );
                                    });
                                }
                            }
                        })()}
                    </LandmarksWrapper>
                </URLQueriesManager>
            </ContentContainter>
        </>
    );
};

export default BulkLandmarks;
