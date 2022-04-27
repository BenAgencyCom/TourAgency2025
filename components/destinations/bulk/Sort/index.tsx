// Tools
import { styled } from "@mui/system";
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
import ResultsInTotal from "@/components/_utils/ResultsInTotal";
import FlexBox from "@/components/_utils/styled/FlexBox";

const SortingToolsWrapper = styled(FlexBox)(({ theme }) => ({
    marginBottom: "20px",
    ["@media (max-width:900px)"]: {
        fontSize: "5rem",
        flexDirection: "column",
        maxWidth: "600px",
        ".MuiInputBase-root": {
            width: "100%",
            height: "45px",
            marginTop: "10px",
            "&:nth-of-type(1)": {
                marginTop: "0px",
            },
        },
    },
}));

interface SortProps {
    refreshData: (pageNumber?: number) => Promise<void>;
    resultsInTotal: number;
}

const Sort: FunctionComponent<SortProps> = (props) => {
    const SEARCHING_DELAY = 500;
    const router = useRouter();

    const [order, setOrder] = useState<Order>(getDefaultOrder(router.query.order));
    const [continent, setContinent] = useState<Continent>(getDefaultContinent(router.query.continent));
    const [searchingPhrase, setSearchingPhrase] = useState<string>((router.query.searchingPhrase as string) ?? "");
    const [debounce, setDebounce] = useState<number | null>(null);

    const setSelectValue = async (e: any, property: "order" | "continent") => {
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
            <SortingToolsWrapper>
                <SearchingBar value={searchingPhrase} onChange={changeSearchingPhrase}></SearchingBar>
                <SelectContinent value={continent} onChange={(e) => setSelectValue(e, "continent")}></SelectContinent>
                <SelectOrder value={order} onChange={(e) => setSelectValue(e, "order")}></SelectOrder>
            </SortingToolsWrapper>
            <DebounceBar
                duration={SEARCHING_DELAY} //
                key={debounce}
                playAnimation={debounce !== null}
            ></DebounceBar>

            <ResultsInTotal resultsInTotal={props.resultsInTotal}></ResultsInTotal>
        </>
    );
};

export default Sort;
