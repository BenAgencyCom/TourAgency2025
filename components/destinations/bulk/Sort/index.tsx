// Tools
import { useState } from "react";
import { useRouter } from "next/router";
import { getDefaultContinent, getDefaultOrder } from "@/utils/client/reviewsSortingHelpers";
// Types
import type { Order, Continent } from "@/@types/SortReviews";
import type { FunctionComponent, ChangeEvent } from "react";
// Other components
import DebounceBar from "./DebounceBar";
import SelectContinent from "./SelectContinent";
import SelectOrder from "./SelectOrder";
import SearchingBar from "./SearchingBar";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface SortProps {
    refreshData: (pageNumber?: number) => Promise<void>;
}

const Sort: FunctionComponent<SortProps> = (props) => {
    const SEARCHING_DELAY = 500;
    const router = useRouter();

    const [order, setOrder] = useState<Order>(getDefaultOrder(router.query.order));
    const [continent, setContinent] = useState<Continent>(getDefaultContinent(router.query.continent));
    const [searchingPhrase, setSearchingPhrase] = useState<string>((router.query.searchingPhrase as string) ?? "");
    const [debounce, setDebounce] = useState<number | null>(null);

    const setSelectValue = async (e: ChangeEvent<HTMLInputElement>, property: "order" | "continent") => {
        const { value } = e.target;

        if (property === "order") {
            setOrder(value as Order);
            router.query.order = value;
        } else if (property == "continent") {
            setContinent(value as Continent);
            router.query.continent = value;
        }

        await props.refreshData(1);
    };

    const changeSearchingPhrase = async (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setSearchingPhrase(value);
        if (debounce !== null) clearTimeout(debounce);
        setDebounce(
            setTimeout(async () => {
                router.query.searchingPhrase = value;
                setDebounce(null);
                await props.refreshData(1);
            }, SEARCHING_DELAY) as unknown as number
        );
    };

    return (
        <>
            <FlexBox sx={{ mb: "20px" }}>
                <SearchingBar value={searchingPhrase} onChange={changeSearchingPhrase}></SearchingBar>
                <SelectContinent value={continent} onChange={(e) => setSelectValue(e, "continent")}></SelectContinent>
                <SelectOrder value={order} onChange={(e) => setSelectValue(e, "order")}></SelectOrder>
            </FlexBox>
            <DebounceBar
                duration={SEARCHING_DELAY} //
                key={debounce}
                playAnimation={debounce !== null}
            ></DebounceBar>
        </>
    );
};

export default Sort;
