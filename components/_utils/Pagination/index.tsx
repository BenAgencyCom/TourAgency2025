// Tools
import { useRouter } from "next/router";
import usePagination from "@mui/material/usePagination";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Styled components
import Ellipsis from "./Ellipsis";
import PaginationStep from "./PaginationStep";
import NavigationButton from "./NavigationButton";
import FlexBox from "@/components/_utils/styled/FlexBox";

interface PaginationProps {
    paginationProperties: PaginationProperties;
    scrollToElement?: string;
    callbackDuringScrolling?: (pageNumber: number) => any;
    sx?: SxProps;
}

const Pagination: FunctionComponent<PaginationProps> = (props) => {
    const router = useRouter();

    const pagination = usePagination({
        count: props.paginationProperties.pagesInTotal,
        page: props.paginationProperties.currentPage,
    });

    const { pagesInTotal, currentPage } = props.paginationProperties;

    const changePage = (page: number) => {
        if (props.scrollToElement) {
            const el = document.getElementById(props.scrollToElement);
            if (!el) throw new Error(`Element with an id ${props.scrollToElement} cannot be accessed`);
            const top = el.getBoundingClientRect().top + window.scrollY;
            scrollTo({ left: 0, top: top - 100, behavior: "smooth" });

            if (props.callbackDuringScrolling) props.callbackDuringScrolling(page);
        } else {
            router.push({
                pathname: router.pathname,
                query: {
                    ...router.query,
                    page: page,
                },
            });
        }
    };

    return (
        <FlexBox horizontal="center" sx={{ mb: "50px" }}>
            {pagination.items.map((item, index) => {
                switch (item.type) {
                    case "page":
                        return (
                            <PaginationStep
                                current={item.selected} //
                                key={index}
                                onClick={() => changePage(item.page)}
                            >
                                {item.page}
                            </PaginationStep>
                        );
                    case "previous":
                        return (
                            <NavigationButton
                                key={index} //
                                direction="previous"
                                disabled={item.disabled}
                                onClick={() => changePage(props.paginationProperties.currentPage - 1)}
                            />
                        );
                    case "next":
                        return (
                            <NavigationButton
                                key={index} //
                                direction="next"
                                disabled={item.disabled}
                                onClick={() => changePage(props.paginationProperties.currentPage + 1)}
                            />
                        );
                    case "start-ellipsis":
                        return <Ellipsis key={index} />;
                    case "end-ellipsis":
                        return <Ellipsis key={index} />;
                }
            })}
        </FlexBox>
    );
};

export default Pagination;
