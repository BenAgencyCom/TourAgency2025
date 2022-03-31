// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Other components
import Link from "next/link";
import Separator from "./Separator";

const BreadCrumbWrapper = styled("span")<{ active?: true }>(({ theme, ...props }) => ({
    textTransform: "capitalize",
    fontSize: "1.2rem",
    cursor: "pointer",
    fontWeight: "bold",
    letterSpacing: "1px",
    ...(props.active
        ? {
              color: theme.palette.primary.main,
          }
        : {
              transition: "color .3s",
              "&:hover": {
                  color: theme.palette.primary.main,
              },
              a: {
                  transition: "color .3s",
                  "&:hover": {
                      color: theme.palette.primary.main,
                  },
              },
          }),
}));

interface BreadcrumbsNavigationProps {
    url?: string;
    children: ReactNode;
    active?: true;
}
const BreadcrumbsNavigation: FunctionComponent<BreadcrumbsNavigationProps> = (props) => {
    return (
        <>
            <BreadCrumbWrapper active={props.active}>
                {(() => {
                    if (props.url) {
                        return (
                            <Link href={props.url} passHref>
                                {props.children}
                            </Link>
                        );
                    } else return <span>{props.children}</span>;
                })()}
            </BreadCrumbWrapper>
            {!props.active && <Separator>/</Separator>}
        </>
    );
};

export default BreadcrumbsNavigation;
