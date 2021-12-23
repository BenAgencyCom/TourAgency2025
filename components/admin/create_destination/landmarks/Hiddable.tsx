import type { FunctionComponent, ReactNode } from "react";
import Box from "@mui/material/Box";

interface HiddableProps {
    children: ReactNode;
    height: number;
    hide: boolean;
}

const Hiddable: FunctionComponent<HiddableProps> = (props) => {
    return (
        <Box
            sx={{
                overflow: "hidden",
                maxHeight: props.hide ? "0px" : `${props.height}px`,
                transition: "max-height .3s",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {props.children}
        </Box>
    );
};

export default Hiddable;
