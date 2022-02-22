// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
// Styled component
const Wrapper = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "0px",
    right: "0px",
    width: "50px",
    height: "30px",
    background: "red",
    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
}));

interface FlagProps {
    countryCode: string;
    country: string;
}
const Flag: FunctionComponent<FlagProps> = (props) => {
    return (
        <Tooltip
            title={props.country}
            placement="top"
            componentsProps={{
                tooltip: {
                    sx: {
                        fontSize: "1rem",
                        letterSpacing: "1px",
                        fontWeight: 300,
                        textTransform: "capitalize",
                    },
                },
            }}
        >
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
