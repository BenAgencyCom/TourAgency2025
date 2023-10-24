// Tools
import { styled } from "@mui/system";
import { useState } from "react";
// Types
import type { NextRouter } from "next/router";
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import Image from "next/image";
// Material UI Icons
import BlurOff from "@mui/icons-material/BlurOff";
// Styled components

const Divider = styled("hr")(({ theme }) => ({
    maxWidth: "350px",
    marginTop: "50px",
    width: "100vw",
    height: "1px",
    opacity: ".3",
    background: theme.palette.text.primary,
}));

const FlexBoxColumnCenter = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));

const NoResultsWrapper = styled(FlexBoxColumnCenter)(({ theme }) => ({
    width: "100%",
    marginBottom: "100px",
    svg: {
        fontSize: "10rem",
        color: theme.palette.primary.main,
    },
    textAlign: "center",
    strong: {
        color: theme.palette.primary.main,
    },
    fontSize: "1.2rem",
    cursor: "default",
    h3: {
        fontSize: "2rem",
        margin: "0 0 10px 0",
    },
    "span.asterisks": {
        fontWeight: "900",
        fontStyle: "normal",
        fontSize: "1.6rem",
    },
    "div.explanations": {
        fontStyle: "italic",
        fontSize: "1.2rem",
    },
    "div.more-information": {
        "span.single-more-information-point": {
            marginTop: "5px",
            "&:nth-of-type(1)": {
                marginTop: "0",
            },
        },
    },
    ["@media (max-width:900px)"]: {
        h3: {
            fontSize: "2.5rem",
        },
    },
    ["@media (max-width:400px)"]: {
        button: {
            width: "100%",
        },
    },
}));
interface ThereAreNoResultsProps {
    router?: NextRouter;
    header?: string;
    moreInformation?: ReactNode[];
    routerQueriesToHandle?: [{ queryName: string; msg: (value: string) => string }];
    searchingPhraseExplanation?: string;
}
const ThereAreNoResults: FunctionComponent<ThereAreNoResultsProps> = (props) => {
    const [playEasterEgg, setPlayEasterEgg] = useState<boolean>(false);
    const moreInformation: ReactNode[] = props.moreInformation ?? [];
    const explanations: ReactNode[] = [];

    if (props.router) {
        /**
         * Add extra information releted to one particular key of `router.query` object
         *
         * Returns span containing asterisks so as to make user able to
         * know which point in extra information section reffers to which point in explanation section
         */
        const addToExplanation = (contentToBeAdded: string): ReactNode => {
            const asterisks: ReactNode = <span className="asterisks">{explanations.map(() => "*") + "*"}</span>;
            explanations.push(
                <span key={explanations.length}>
                    {asterisks}
                    {contentToBeAdded}
                </span>
            );
            return asterisks;
        };

        const { query } = props.router;
        const addToMoreInformation = (body: ReactNode) => {
            moreInformation.push(
                <span key={moreInformation.length} className="single-more-information-point">
                    {body}
                </span>
            );
        };
        Object.keys(query).forEach((key) => {
            if (key === "continent") {
                if (query[key] === "all") return;
                addToMoreInformation(
                    <>
                        In <strong>{(query[key] as any).replace("_", " ")} </strong>{" "}
                    </>
                );
            } else if (key === "searchingPhrase" && query[key]?.length) {
                if ((query[key] as any).toLowerCase() === "jebac gorzen" && !playEasterEgg) setPlayEasterEgg(true);

                const asterisks = props.searchingPhraseExplanation
                    ? addToExplanation(`The algorithm looks for records containing searching phrase only in their ${props.searchingPhraseExplanation}`)
                    : null;

                addToMoreInformation(
                    <>
                        Containing phrase <strong>{query[key]} </strong> {asterisks}
                    </>
                );
            } else if (props.routerQueriesToHandle && props.routerQueriesToHandle.length) {
                for (let { queryName, msg } of props.routerQueriesToHandle) {
                    if (queryName === key) {
                        const value = query[key] as string;
                        const capitalizedValue = value[0] + value.slice(1).toLowerCase();
                        const splitted = msg(value).split(value);
                        addToMoreInformation(
                            <>
                                {splitted[0]}
                                <strong>{capitalizedValue} </strong>
                                {splitted[1]}
                            </>
                        );
                    }
                }
            }
        });
    }

    return (
        <Fade in={true}>
            <NoResultsWrapper className="there-are-no-results">
                {(() => {
                    if (playEasterEgg) return <EasterEgg></EasterEgg>;
                    return (
                        <>
                            <BlurOff></BlurOff>
                            <h3>{props.header ?? "Nothing to explore"}</h3>
                            {props.children}
                            {moreInformation.length > 0 && <FlexBoxColumnCenter className="more-information">{moreInformation}</FlexBoxColumnCenter>}
                            {explanations.length > 0 && (
                                <>
                                    <Divider></Divider>
                                    <FlexBoxColumnCenter className="explanations">{explanations}</FlexBoxColumnCenter>
                                </>
                            )}
                        </>
                    );
                })()}
            </NoResultsWrapper>
        </Fade>
    );
};

export default ThereAreNoResults;

const EasterEggWrapper = styled("div")(({ theme }) => ({
    width: "500px",
    height: "500px",
    position: "relative",
    marginBottom: "100px",

    ["@media (max-width:700px)"]: {
        width: "400px",
        height: "400px",
    },
    ["@media (max-width:550px)"]: {
        width: "300px",
        height: "300px",
    },
}));
const EasterEgg: FunctionComponent = () => {
    return (
        <EasterEggWrapper>
            <Image src="/easter_egg.gif" unoptimized layout="fill" alt="easer egg"></Image>
        </EasterEggWrapper>
    );
};
