// Tools
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { selectOrder } from "./_utls/SelectOrderData";
import getDefaultValues from "./_utls/getDefaultValues";
import updateURLQueries from "./_utls/updateURLQueries";
import generateQueryString from "./_utls/generateQueryString";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { InputBaseProps } from "@mui/material/InputBase";
import type { SelectProps, SelectExtraOrderOption } from "./@types";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Other Components
import Skeletons from "./Skeletons";
import SelectOrder from "./SelectOrder";
import DebounceBar from "./DebounceBar";
import ExtraSelects from "./ExtraSelects";
import SearchingBar from "./SearchingBar";
// Styled components
import ResultsInTotal from "@/components/_utils/ResultsInTotal";
import Pagination from "@/components/_utils/Pagination";

const URLQueriesManagerWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    marginBottom: "20px",
    height: "46px",
    ".MuiSkeleton-root, .MuiInputBase-root": {
        marginRight: "20px",
    },
}));

interface URLQueriesManagerProps {
    searchingPhrase?: InputBaseProps | boolean;
    extraSelects?: SelectProps[];
    extraOrderOptions?: SelectExtraOrderOption[];
    paginationProperties?: PaginationProperties & { idOfElementToScrollTo: string };
    queryForData: (urlQueries: string) => any;
}
/**
 * ### Purpose
 * The purpose of this component is to **handle all operations** related with
 * dynamically changing URL queries without the neccesity of refreshing the page and moreover
 * to **compress all properties into one query string** so as to use it while fetching data
 *
 * ### Props
 */
const URLQueriesManager: FunctionComponent<URLQueriesManagerProps> = (props) => {
    const SEARCHING_DELAY = 500; // [ms] Debounce purpose
    const KEEPING_SKELETONS_ALIVE = 100; // [ms]

    const [state, setState] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [latestQueryCallString, setLatestQueryCallString] = useState<string>("");
    const router = useRouter();

    const selectOrderData = useMemo<SelectProps>(() => selectOrder(props.extraOrderOptions), [props.extraOrderOptions]);
    const allSelects = useMemo<SelectProps[]>(() => [...(props.extraSelects ?? []), selectOrderData], [props.extraSelects, selectOrderData]);
    const expectedProperties = useMemo<string[]>(() => allSelects.map((prop) => prop.key), [allSelects]);

    //
    const changeProperty = (propertyName: string, e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setState((currentState) => {
            return { ...currentState, ...{ [propertyName]: e.target.value } };
        });
    };
    // Set default values
    const [loadingTimeout, setLoadingTimeout] = useState<any>(null);
    useEffect(() => {
        let isMounted = true;

        const updatedState = getDefaultValues({
            allSelects, //
            expectedProperties,
            routerQueries: router.query,
            lookForASeachingPhrase: Boolean(props.searchingPhrase),
        });
        setState((currentState) => ({ ...currentState, ...updatedState }));
        setTemporarySearchingPhrase(updatedState["searchingPhrase"] ? updatedState["searchingPhrase"] : "");
        if (Object.keys(router.query).length === 0)
            setLoadingTimeout(
                setTimeout(() => {
                    if (isMounted) setLoading(false);
                }, 1000)
            );
        else {
            if (loadingTimeout) clearTimeout(loadingTimeout);
            setTimeout(() => {
                if (isMounted) setLoading(false);
            }, KEEPING_SKELETONS_ALIVE);
        }

        return () => {
            isMounted = false;
        };
    }, [router.query, expectedProperties, allSelects, loadingTimeout, props.searchingPhrase]);
    //
    useEffect(() => updateURLQueries({ state, routerQueries: router.query }), [state, router.query]);
    //
    // Query for data
    //
    useEffect(() => {
        if (Object.keys(state).length === 0 || loadingTimeout) return;
        const currentQueryString = JSON.stringify(state);
        if (currentQueryString === latestQueryCallString) return;

        setLatestQueryCallString(currentQueryString);
        props.queryForData(generateQueryString({ allSelects, state }));
    }, [latestQueryCallString, state, props, allSelects, loadingTimeout]);

    // Seachirng bar special DEBOUNCE logic
    const [temporarySearchingPhrase, setTemporarySearchingPhrase] = useState<string>("");
    const [debounce, setDebounce] = useState<number | null>(null);

    const changeSearchingPhrase = async (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setTemporarySearchingPhrase(value);
        if (debounce !== null) clearTimeout(debounce);
        setDebounce(
            setTimeout(async () => {
                setDebounce(null);
                setState((currentState) => {
                    return {
                        ...currentState,
                        ...{
                            searchingPhrase: value,
                            page: "1",
                        },
                    };
                });
            }, SEARCHING_DELAY) as unknown as number
        );
    };

    return (
        <>
            <URLQueriesManagerWrapper id="url-queries-manager-wrapper">
                {(() => {
                    if (loading)
                        return (
                            <Skeletons
                                amountOfSelects={allSelects.length} //
                                includeSearchingBar={Boolean(props.searchingPhrase)}
                            ></Skeletons>
                        );
                    else {
                        return (
                            <>
                                {(() => {
                                    if (props.searchingPhrase) {
                                        return (
                                            <SearchingBar
                                                value={temporarySearchingPhrase} //
                                                onChange={changeSearchingPhrase}
                                                {...(props.searchingPhrase !== true && props.searchingPhrase)}
                                            ></SearchingBar>
                                        );
                                    }
                                })()}
                                <ExtraSelects
                                    state={state} //
                                    update={changeProperty}
                                    extraSelects={props.extraSelects}
                                ></ExtraSelects>

                                <SelectOrder
                                    {...selectOrderData} //
                                    options={selectOrderData.options as SelectExtraOrderOption[]}
                                    value={state["order"]}
                                    update={(e) => changeProperty("order", e as any)}
                                ></SelectOrder>
                            </>
                        );
                    }
                })()}
            </URLQueriesManagerWrapper>
            {/* Render debounce bar to highlight searching bar delay */}
            {(() => {
                if (props.searchingPhrase) {
                    return (
                        <DebounceBar
                            duration={SEARCHING_DELAY} //
                            key={debounce}
                            playAnimation={debounce !== null}
                        ></DebounceBar>
                    );
                }
            })()}
            {props.paginationProperties && <ResultsInTotal resultsInTotal={props.paginationProperties.recordsInTotal}></ResultsInTotal>}
            {/*  */}
            {/*  */}
            {props.children}
            {/*  */}
            {/*  */}
            {props.paginationProperties && (
                <Pagination
                    paginationProperties={props.paginationProperties} //
                    scrollToElement={props.paginationProperties.idOfElementToScrollTo}
                    callbackDuringScrolling={(pageNumber: any) => changeProperty("page", { target: { value: pageNumber } } as any)}
                    sx={{ marginTop: "50px" }}
                ></Pagination>
            )}
        </>
    );
};

export default URLQueriesManager;
