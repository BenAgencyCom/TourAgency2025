// Tools
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { selectOrder } from "./_utls/SelectOrderData";
import getDefaultValues from "./_utls/getDefaultValues";
import updateURLQueries from "./_utls/updateURLQueries";
import { useState, useEffect, useMemo, useRef } from "react";
import generateQueryString from "./_utls/generateQueryString";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent, ChangeEvent } from "react";
import type { InputBaseProps } from "@mui/material/InputBase";
import type { SelectProps, SelectExtraOrderOption } from "./@types";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import Skeletons from "./Skeletons";
import SelectOrder from "./SelectOrder";
import DebounceBar from "./DebounceBar";
import ExtraSelects from "./ExtraSelects";
import SearchingBar from "./SearchingBar";
import LineIntroAnimation from "@/components/_utils/LineIntroAnimation";
// Styled components
import Pagination from "@/components/_utils/Pagination";
import ResultsInTotal from "@/components/_utils/ResultsInTotal";

const URLQueriesManagerWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "20px",
    position: "relative",
    ".MuiSkeleton-root, .line-animation-wrapper": {
        marginRight: "10px",
        marginBottom: "10px",
        ".MuiInputBase-root": {
            height: "40px",
        },
    },
    ["@media (max-width:900px)"]: {
        flexDirection: "column",
        ".MuiSkeleton-root, .line-animation-wrapper": {
            marginRight: "0px",
            marginBottom: "10px",
            width: "100%",
            ".MuiInputBase-root": {
                height: "40px",
                width: "100%",
            },
        },
    },
}));

interface URLQueriesManagerProps {
    /**
     * The callback which is going be fired  after each significant
     * modification of the rendered input. The callback will be
     * automatically passed one argument type of string containing
     * generated based on input fields query string
     * ```ts
     * const callbackExample = async (queryString:string) =>{
     *      const response = await axios.get(`/api/dogs${queryString}`);
     * }
     * ```
     * **Note**:
     * All characters like exclamation mark at the begining and all ampersands between
     * properties are already been included, so there is no need to worry about them
     */
    queryForData: (urlQueries: string) => any;
    lineAnimationColor: "primary" | "text" | "background" | "paperDefault" | "paperLight";
    /**
     * Could be either `true` to simply text input and handle all
     * operations related with it OR to be more precise about the input appearance
     * the value could match **Material UI** `InputBaseProps` interface
     */
    searchingPhrase?: InputBaseProps | boolean;
    /**An array with details about extra **FILTERING** ways */
    extraSelects?: SelectProps[];
    /**An array with details about extra **FILTERING** ways */
    extraOrderOptions?: SelectExtraOrderOption[];
    /**An object with all the details needed to process and handle data pagination */
    paginationProperties?: PaginationProperties & {
        /**In order to smooth scroll to the top of the data, it is mandatory to
         * pass an id of the element as the top border of scrolling*/
        idOfElementToScrollTo?: string;
    };
    disableResultsInTotal?: true;
    otherURLQueries?: string[];
    disableEverything?: boolean;
    /**Extra styles applied to highest-level wrapper */
    sx?: SxProps;
}
/**
 * ### Purpose
 * The purpose of this component is to **handle all operations** related with
 * dynamically changing URL queries without the neccesity of refreshing the page and moreover
 * to **compress all properties into one query string** in order to fetch specific data from api
 */
const URLQueriesManager: FunctionComponent<URLQueriesManagerProps> = (props) => {
    const SEARCHING_DELAY = 500; // [ms] Debounce purpose
    const KEEPING_SKELETONS_ALIVE = 100; // [ms]

    const wrapperNode = useRef<HTMLElement | null>(null);
    const [state, setState] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [latestQueryCallString, setLatestQueryCallString] = useState<string>("");
    const router = useRouter();

    const selectOrderData = useMemo<SelectProps>(() => selectOrder(props.extraOrderOptions), [props.extraOrderOptions]);
    const allSelects = useMemo<SelectProps[]>(() => [...(props.extraSelects ?? []), selectOrderData], [props.extraSelects, selectOrderData]);
    const expectedProperties = useMemo<string[]>(() => allSelects.map((prop) => prop.key), [allSelects]);

    const changeProperty = (propertyName: string, e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setState((currentState) => {
            return {
                ...currentState,
                ...{
                    [propertyName]: e.target.value,
                    ...(propertyName !== "page" && { page: "1" }),
                },
            };
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
        //
        // This might be an issue noticeable only when in the development mode while nextjs
        // renders everything "meticulously" and consumes a lot of time on it
        //
        // 1. Initially, when `router.query` is not fully accessable,
        //    impose one second long timeout before displaying the content,
        //    which can be canceled automatically by changed router object
        //
        // 2. When `router.query` is instantly accessable then keep on holding
        //    skeletons alive for very short time period so as to ensure that
        //    all data have been loaded
        //
        if (Object.keys(router.query).length === 0)
            setLoadingTimeout(
                setTimeout(() => {
                    if (isMounted) {
                        setLoading(false);
                        setLoadingTimeout(false);
                    }
                }, 1000)
            );
        else {
            if (loadingTimeout) clearTimeout(loadingTimeout);
            setTimeout(() => {
                if (isMounted) {
                    setLoading(false);
                    setLoadingTimeout(false);
                }
            }, KEEPING_SKELETONS_ALIVE);
        }

        return () => {
            isMounted = false;
        };
    }, [router.query, expectedProperties, allSelects, loadingTimeout, props.searchingPhrase]);
    //
    // Update URL queries
    //
    useEffect(
        () =>
            updateURLQueries({
                state, //
                routerQueries: router.query,
                otherURLQueries: props.otherURLQueries,
            }),
        [state, router.query, props.otherURLQueries]
    );
    //
    // Query for data
    //
    useEffect(() => {
        // 1. Avoid calling callback when `URLQueriesManager` hasn't fully loaded
        if (Object.keys(state).length === 0 || loadingTimeout) return;
        // 2. Avoid calling callback when trying to make a request with IDENDICAL parameters
        const currentQueryString = JSON.stringify(state);
        if (currentQueryString === latestQueryCallString) return;
        setLatestQueryCallString(currentQueryString);
        // 3. Smooth scrolling, trick with fixing height
        if (wrapperNode.current) {
            const setMinHeight = (px: number) => {
                if (wrapperNode.current) wrapperNode.current.style.minHeight = `${px}px`;
            };
            // 3.1 Avoid instant dwindlling of wrapper
            const minHeight = wrapperNode.current.getBoundingClientRect().height;
            setMinHeight(minHeight);
            // 3.2 Reverse temporary changes
            // ---
            // (we mustn't ensure that the component is mounted in order to reverse the change after timeout)
            // if we do so, nothing would be reversed, because in this
            // timeout the component will be rendered back again
            // otherwise it does not matter as long as there is no nerd
            // searching the console log to prove this technology is "bad"
            setTimeout(() => setMinHeight(0), 750);
        }
        // 4. Call the callback
        setTimeout(() => {
            props.queryForData(
                generateQueryString({
                    allSelects, //
                    state,
                    otherURLQueries: props.otherURLQueries,
                    routerQueries: router.query,
                })
            );
        }, 1);
    }, [latestQueryCallString, state, props, allSelects, loadingTimeout, router.query, props.otherURLQueries]);

    // Seachirng bar special DEBOUNCE logic
    const [temporarySearchingPhrase, setTemporarySearchingPhrase] = useState<string>("");
    const [debounce, setDebounce] = useState<number | null>(null);

    const changeSearchingPhrase = async (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value === (state as any)["searchingPhrase"]) return;
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
        <Box ref={wrapperNode as any} sx={props.sx}>
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
                                            <LineIntroAnimation
                                                in={true} //
                                                intro="left"
                                                outro="top"
                                                color={props.lineAnimationColor}
                                                delay={100}
                                            >
                                                <SearchingBar
                                                    value={temporarySearchingPhrase} //
                                                    onChange={changeSearchingPhrase}
                                                    disabled={props.disableEverything}
                                                    {...(props.searchingPhrase !== true && props.searchingPhrase)}
                                                ></SearchingBar>
                                            </LineIntroAnimation>
                                        );
                                    }
                                })()}
                                <ExtraSelects
                                    state={state} //
                                    update={changeProperty}
                                    extraSelects={props.extraSelects}
                                    lineAnimationColor={props.lineAnimationColor}
                                    disabled={props.disableEverything}
                                ></ExtraSelects>

                                <LineIntroAnimation
                                    in={true} //
                                    intro="left"
                                    outro="top"
                                    color={props.lineAnimationColor}
                                    delay={150 + (props.extraSelects ? props.extraSelects.length * 50 : 0)}
                                >
                                    <SelectOrder
                                        {...selectOrderData} //
                                        options={selectOrderData.options as SelectExtraOrderOption[]}
                                        value={state["order"]}
                                        update={(e) => changeProperty("order", e as any)}
                                        disabled={props.disableEverything}
                                    ></SelectOrder>
                                </LineIntroAnimation>
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
            {props.paginationProperties && !props.disableResultsInTotal && <ResultsInTotal resultsInTotal={props.paginationProperties.recordsInTotal} />}
            {/*  */}
            {/*  */}
            {props.children}
            {/*  */}
            {/*  */}
            {props.paginationProperties && props.paginationProperties.pagesInTotal > 1 && (
                <Pagination
                    paginationProperties={props.paginationProperties} //
                    scrollToElement={props.paginationProperties.idOfElementToScrollTo ?? "url-queries-manager-wrapper"}
                    callbackDuringScrolling={(pageNumber: any) => changeProperty("page", { target: { value: pageNumber } } as any)}
                    sx={{ marginTop: "50px" }}
                ></Pagination>
            )}
        </Box>
    );
};

export default URLQueriesManager;
