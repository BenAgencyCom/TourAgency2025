// Tools
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { selectOrder } from "./_utls/SelectOrderData";
import getDefaultValues from "./_utls/getDefaultValues";
import updateURLQueries from "./_utls/updateURLQueries";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { SelectProps, SelectExtraOrderOption } from "./@types";
// Other Components
import SelectOrder from "./SelectOrder";
import ExtraSelects from "./ExtraSelects";

interface URLQueriesManagerProps {
    searchingPhrase?: true;
    extraSelects?: SelectProps[];
    extraOrderOptions?: SelectExtraOrderOption[];
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
    const [state, setState] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState<boolean>(true);
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

        const updatedState = getDefaultValues({ allSelects, expectedProperties, routerQueries: router.query });
        setState((currentState) => ({ ...currentState, ...updatedState }));

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
            }, 80);
        }

        return () => {
            isMounted = false;
        };
    }, [router.query, expectedProperties, allSelects, loadingTimeout]);

    //
    useEffect(() => updateURLQueries({ state, routerQueries: router.query }), [state, router.query]);

    return (
        <>
            {(() => {
                if (loading) return <h3>Loading...</h3>;
                else {
                    return (
                        <>
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
        </>
    );
};

export default URLQueriesManager;
