// Tools
import { styled } from "@mui/system";
import { useRouter } from "next/router";
// Types
import type { FunctionComponent } from "react";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const PagginationStep = styled("div", {
    shouldForwardProp: (propName: string) => {
        return !["current"].includes(propName);
    },
})<{ current: boolean }>(({ theme, ...props }) => ({
    width: "40px",
    height: "40px",
    borderRadius: "5px",
    margin: "0 5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: props.current ? theme.palette.primary.main : theme.palette.text.primary,
    color: "#fff",
    userSelect: "none",
    fontWeight: 500,
    fontSize: "1.2rem",
    boxSizing: "border-box",
    ...(!props.current && {
        transition: "all .3s",
        border: `2px solid ${theme.palette.text.primary}`,
        cursor: "pointer",
        "&:hover": {
            color: theme.palette.text.primary,
            background: "#fff",
        },
    }),
}));

interface PaginationProps {
    paginationProperties: PaginationProperties;
    scrollToElement?: string;
    callbackDuringScrolling?: (pageNumber: number) => any;
}

const Pagination: FunctionComponent<PaginationProps> = (props) => {
    const router = useRouter();
    const { pagesInTotal, currentPage } = props.paginationProperties;

    const changePage = (page: number) => {
        if (props.scrollToElement) {
            const el = document.getElementById(props.scrollToElement);
            if (!el) throw new Error(`Element with an id ${props.paginationProperties} cannot be accessed`);
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
        <FlexBox sx={{ marginBottom: "50px" }} horizontal="center">
            {Array.from(Array(pagesInTotal).keys()).map((item, index) => {
                const page = index + 1;
                const isCurrent = page === currentPage;
                const onClick = isCurrent ? undefined : () => changePage(page);

                return (
                    <PagginationStep current={isCurrent} key={index} onClick={onClick}>
                        {page}
                    </PagginationStep>
                );
            })}
        </FlexBox>
    );
};

export default Pagination;
