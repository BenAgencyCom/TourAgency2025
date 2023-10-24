// Tools
import { styled } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { Continent } from "@prisma/client";
// Other components
import Image from "next/image";
// Styled components
const MapWrapper = styled("div")(({ theme }) => ({
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "90%",
    right: "0%",
    opacity: 0.5,
}));

const Map: FunctionComponent<{ continent: Continent; sx?: SxProps }> = (props) => {
    return (
        <MapWrapper sx={props.sx} className="background-map">
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
