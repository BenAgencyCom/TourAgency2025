// Tools
import axios from "axios";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { Destination } from "@/@types/pages/create/CreateLandmark";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import SingleDestination from "./SingleDestination";
import StageHeader from "@/components/create/_utils/StageHeader";
import URLQueriesManager from "@/components/_utils/URLQueriesManager";
import ThereAreNoResults from "@/components/_utils/ThereAreNoResults";
import SkeletonLoading from "@/components/_utils/SingleLandmark/SkeletonLoading";
// Material UI Icons
import Public from "@mui/icons-material/Public";
// Styled components
const DestinationsWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
}));

interface StageOneProps {
    disableContinueButton: StatedDataField<boolean>;
    selectedDestination: StatedDataField<Destination | null>;
}

const StageOne: FunctionComponent<StageOneProps> = (props) => {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);

    const queryForData = async (urlQueries: string) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/destination/_all${urlQueries}&perPage=6`);
            if (res.data) {
                setDestinations(res.data.data);
                setPaginationProperties(res.data.pagination);
                setLoading(false);
            }
        } catch (e: unknown) {
            router.push("/500");
        }
    };

    useEffect(() => {
        props.disableContinueButton.setValue(props.selectedDestination.value === null);
    }, [props.selectedDestination, props.disableContinueButton]);
    return (
        <>
            <StageHeader title="Select destination" stageNumber={1}></StageHeader>
            <URLQueriesManager
                queryForData={queryForData} //
                searchingPhrase
                paginationProperties={
                    paginationProperties && !loading
                        ? {
                              ...paginationProperties,
                              idOfElementToScrollTo: "create-content-wrapper",
                          }
                        : undefined
                }
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
                        ],
                        defaultValue: "all",
                        omitIfDeafult: true,
                        sx: {
                            width: "250px",
                        },
                    },
                ]}
                sx={{
                    ".pagination-wrapper": {
                        justifyContent: "flex-start !important",
                    },
                }}
            >
                <DestinationsWrapper>
                    {(() => {
                        if (loading)
                            return (
                                <>
                                    <div style={{ height: "100px", width: "100%" }} />
                                    <SkeletonLoading sx={{ display: "none" }} />
                                    <SkeletonLoading sx={{ display: "none" }} />

                                    <SkeletonLoading />
                                    <SkeletonLoading />
                                    <SkeletonLoading />
                                </>
                            );
                        else {
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
                                return destinations.map((destination) => {
                                    return (
                                        <SingleDestination
                                            key={destination.id} //
                                            destination={destination}
                                            selectedDestination={props.selectedDestination}
                                        ></SingleDestination>
                                    );
                                });
                            }
                        }
                    })()}
                </DestinationsWrapper>
            </URLQueriesManager>
        </>
    );
};

export default StageOne;
