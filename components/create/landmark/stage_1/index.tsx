// Tools
import RWD from "./RWD";
import axios from "axios";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useCreateLandmarkContext from "@/components/create/landmark/hooks/useCreateLandmarkContext";
// Types
import type { FunctionComponent } from "react";
import type { Destination } from "@/@types/pages/create/CreateLandmark";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Other components
import SingleDestination from "./SingleDestination";
import StageHeader from "@/components/create/_utils/StageHeader";
import URLQueriesManager from "@/components/_utils/URLQueriesManager";
import ThereAreNoResults from "@/components/_utils/ThereAreNoResults";
import SkeletonLoading from "@/components/_utils/SingleLandmark/SkeletonLoading";
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { actions as createContentActions } from "@/redux/slices/createContent";
// Material UI Icons
import Public from "@mui/icons-material/Public";
// Styled components
const DestinationsWrapper = styled("div")(({ theme }) => ({
    ...(RWD as any),
    display: "flex",
    flexWrap: "wrap",
}));

const StageOne: FunctionComponent = (props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { selectedDestination } = useCreateLandmarkContext();

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
        dispatch(
            createContentActions.handleValidationResult({
                disableNavigation: selectedDestination.value === null,
                reason: "",
            })
        );
    }, [dispatch, selectedDestination]);
    return (
        <>
            <StageHeader title="Select destination" stageNumber={1}></StageHeader>
            <URLQueriesManager
                lineAnimationColor="paperLight"
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
                                            selectedDestination={selectedDestination}
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
