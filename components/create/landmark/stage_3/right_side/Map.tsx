// Tools
import { styled } from "@mui/system";
// Types
import type { Continent } from "@prisma/client";
import type { FunctionComponent } from "react";
// Other components
import Image from "next/Image";
// Styled components
const MapWrapper = styled("div")(({ theme }) => ({
    height: "calc(50% - 10px)",
    width: "100%",
    position: "relative",
}));

interface MapProps {
    continent: Continent | "blank";
}

const Map: FunctionComponent<MapProps> = (props) => {
    return (
        <MapWrapper>
            <Image
                alt="continent" //
                layout="fill"
                src={`/images/continents/${props.continent}.png`}
                objectFit="contain"
                objectPosition="left"
            ></Image>
        </MapWrapper>
    );
};

export default Map;
