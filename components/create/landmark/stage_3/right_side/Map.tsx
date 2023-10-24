// Tools
import { styled } from "@mui/system";
import useCreateLandmarkContext from "@/components/create/landmark/hooks/useCreateLandmarkContext";
// Types
import type { FunctionComponent } from "react";
// Other components
import Image from "next/image";
// Styled components
const MapWrapper = styled("div")(({ theme }) => ({
    height: "calc(50% - 10px)",
    width: "100%",
    position: "relative",
}));

const Map: FunctionComponent = () => {
    const { selectedDestination } = useCreateLandmarkContext();

    return (
        <MapWrapper>
            <Image
                alt="continent" //
                layout="fill"
                src={`/images/continents/${selectedDestination.value ? selectedDestination.value.continent : "blank"}.png`}
                objectFit="contain"
                objectPosition="left"
            ></Image>
        </MapWrapper>
    );
};

export default Map;
