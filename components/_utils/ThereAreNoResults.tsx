// Tools
import { styled } from "@mui/system";
import { useState } from "react";
// Types
import type { NextRouter } from "next/router";
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import Image from "next/Image";
// Material UI Icons
import BlurOff from "@mui/icons-material/BlurOff";
// Styled components

const Divider = styled("hr")(({ theme }) => ({
    marginTop: "300px",
    width: "350px",
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
    marginTop: "50px",
    svg: {
        fontSize: "10rem",
        color: theme.palette.primary.main,
    },
    textAlign: "center",
    strong: {
        color: theme.palette.primary.main,
    },
    fontSize: "1.5rem",
    cursor: "default",
    h3: {
        fontSize: "3rem",
        margin: "0 0 30px 0",
    },
    "span.asterisks": {
        fontWeight: "900",
        fontStyle: "normal",
        fontSize: "1.6rem",
    },
    "div.explanations": {
        fontStyle: "italic",
        fontSize: "1.3rem",
    },
}));
interface ThereAreNoResultsProps {
    router?: NextRouter;
    header?: string;
    moreInformation?: ReactNode[];
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
                <span>
                    {asterisks}
                    {contentToBeAdded}
                </span>
            );
            return asterisks;
        };

        const { query } = props.router;
        Object.keys(query).forEach((key) => {
            if (key === "continent") {
                if (query[key] === "all") return;

                moreInformation.push(
                    <span>
                        In <strong>{(query[key] as any).replace("_", " ")} </strong>
                    </span>
                );
            } else if (key === "searchingPhrase" && query[key]?.length) {
                if ((query[key] as any).toLowerCase() === "jebac gorzen" && !playEasterEgg) setPlayEasterEgg(true);

                const asterisks = addToExplanation("The algorithm looks for records containing searching phrase in their either country or city name only");
                moreInformation.push(
                    <span>
                        Containing phrase <strong>{query[key]} </strong> {asterisks}
                    </span>
                );
            }
        });
    }

    return (
        <Fade in={true}>
            <NoResultsWrapper>
                {(() => {
                    if (playEasterEgg) return <EasterEgg></EasterEgg>;
                    return (
                        <>
                            <BlurOff></BlurOff>
                            <h3>{props.header ?? "Nothing to explore"}</h3>
                            {moreInformation.length > 0 && <FlexBoxColumnCenter>{moreInformation}</FlexBoxColumnCenter>}
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
    width: "600px",
    height: "600px",
    position: "relative",
}));
const EasterEgg: FunctionComponent = (props) => {
    return (
        <EasterEggWrapper>
            <Image src="/easter_egg.gif" unoptimized layout="fill" alt="easer egg"></Image>
        </EasterEggWrapper>
    );
};
