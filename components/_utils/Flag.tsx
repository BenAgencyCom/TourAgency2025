// Tools
import { styled } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
// Material UI Components
import Tooltip from "@mui/material/Tooltip";
// Styled component
const Wrapper = styled("div")(({ theme }) => ({
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
    sx?: SxProps;
    className?: string;
}
const Flag: FunctionComponent<FlagProps> = (props) => {
    return (
        <Tooltip title={props.country} placement="top" className={props.className}>
            <Wrapper sx={props.sx}>
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
