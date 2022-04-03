// Tools
import { styled } from "@mui/system";
import { useRouter } from "next/router";
// Types
import type { FunctionComponent } from "react";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const PagginationStep = styled("div")<{ current: boolean }>(({ theme, ...props }) => ({
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
}

const Pagination: FunctionComponent<PaginationProps> = (props) => {
    const router = useRouter();
    const { pagesInTotal, currentPage } = props.paginationProperties;

    const changePage = (page: number) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                page: page,
            },
        });
    };

    return (
        <FlexBox sx={{ marginTop: "50px" }}>
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
