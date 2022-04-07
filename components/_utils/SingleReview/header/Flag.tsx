// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Tooltip from "@mui/material/Tooltip";
// Styled component
const Wrapper = styled("div")(({ theme }) => ({
    position: "absolute",
    top: "-0px",
    right: "-0px",
    width: "60px",
    height: "40px",
    overflow: "hidden",
    img: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
    },
}));

interface FlagProps {
    countryCode: string;
    country: string;
}
const Flag: FunctionComponent<FlagProps> = (props) => {
    return (
        <Tooltip title={props.country} placement="top">
            <Wrapper>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    loading="lazy" //
                    src={`https://flagcdn.com/w80/${props.countryCode}.png`}
                    alt=""
                />
            </Wrapper>
        </Tooltip>
    );
};

export default Flag;
