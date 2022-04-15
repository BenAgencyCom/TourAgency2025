// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { Continent } from "@prisma/client";
// Other components
import Image from "next/Image";
// Styled components
const MapWrapper = styled("div")(({ theme }) => ({
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "90%",
    right: "0%",
    opacity: 0.6,
}));

const Map: FunctionComponent<{ continent: Continent }> = (props) => {
    return (
        <MapWrapper>
            <Image
                alt="continent" //
                layout="fill"
                src={`/images/continents/${props.continent}.png`}
                objectFit="contain"
                objectPosition="right"
            ></Image>
        </MapWrapper>
    );
};

export default Map;
