// Tools
import { styled } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
// Other Components
import Link from "next/link";
// Styled Components
import ButtonWithLineTransition from "@/components/_utils/styled/ButtonWithLineTransition";

const ReadMore = styled("a")(({ theme }) => ({
    marginTop: "10px",
    button: {
        fontSize: "1rem", //
    },
    ["@media (max-width:1000px)"]: {
        marginTop: "50px",
        alignSelf: "center",
        width: "100%",
        maxWidth: "400px",
        button: {
            height: "40px",
            width: "100%",
        },
    },
    ["@media (max-width:500px)"]: {
        marginTop: "20px",
    },
}));

const ReadMoreWrapper: FunctionComponent<{ url: string; sx?: SxProps; msg?: string }> = (props) => {
    return (
        <Link passHref href={props.url}>
            <ReadMore tabIndex={-1} className="read-more">
                <ButtonWithLineTransition primary reverse sx={props.sx}>
                    {props.msg ?? "Read more"}
                </ButtonWithLineTransition>
            </ReadMore>
        </Link>
    );
};

export default ReadMoreWrapper;
