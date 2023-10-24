// Tools
import axios from "axios";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import useWindowSizes from "@/hooks/useWindowSizes";
// Types
import type { FunctionComponent } from "react";
import type { Continent, LandmarkType } from "@prisma/client";
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Other components
import Head from "next/head";
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

const LandmarksWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    paddingBottom: "100px",
}));

const BulkLandmarks: FunctionComponent = () => {
    const router = useRouter();
    const { width } = useWindowSizes();

    const [loading, setLoading] = useState<boolean>(true);
    const [landmarks, setLandmarks] = useState<Landmark[]>([]);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);

    // Computed properties
    const PER_PAGE: number = (() => {
        if (width > 1000) return 12;
        return 6;
    })();
    const imageResolution: "360p" | "480p" = (() => {
        if (width > 600 && width < 1000) return "480p";
        return "360p";
    })();

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
                <title>MES | Landmarks</title>
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
                    lineAnimationColor="paperDefault"
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
                            sx: {
                                width: "200px",
                            },
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
                                width: "230px",
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
                                        <div style={{ height: "60px", width: "100%" }} />
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
                                                imageResolution={imageResolution}
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
