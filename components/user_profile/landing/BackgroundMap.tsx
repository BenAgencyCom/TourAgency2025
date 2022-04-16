// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import Image from "next/Image";
// Styled components
const MapWrapper = styled("div")(({ theme }) => ({
    position: "fixed",
    top: "0%",
    left: "0%",
    width: "calc(100vw - 20px)",
    height: "100%",
    opacity: 0.2,
    zIndex: 0,
    filter: "blur(1px)",
    animationDelay: "2s",
}));

const BackgroundMap: FunctionComponent = () => {
    return (
        <Fade in={true} timeout={2000}>
            <div>
                <MapWrapper>
                    <Image
                        alt="continent" //
                        layout="fill"
                        src={`/images/continents/blank_background.png`}
                        objectFit="cover"
                        objectPosition="center"
                    ></Image>
                </MapWrapper>
            </div>
        </Fade>
    );
};

export default BackgroundMap;
