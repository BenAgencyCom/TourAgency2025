import { TravelDestination } from "@/data/destinations";
import type { FunctionComponent } from "react";
// Components
import Box from "@mui/material/Box";
import Image from "next/image";

const Slide: FunctionComponent<{ destination: TravelDestination; priority: boolean }> = ({ destination, priority }) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100vh",
            }}
        >
            <Image
                src={destination.backgroundSrc} //
                layout="fill"
                alt="background"
                objectFit="cover"
                objectPosition="center 35%"
                priority={priority}
            ></Image>
        </Box>
    );
};

export default Slide;
