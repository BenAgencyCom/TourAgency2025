// Tools
import { styled } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { Continent } from "@prisma/client";
// Other components
import Image from "next/image";
// Styled components
const ContinentMapWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    width: "100%",
    flexGrow: "1",
}));

const ContinentMap: FunctionComponent<{ continent: Continent; sx?: SxProps }> = (props) => {
    return (
        <ContinentMapWrapper sx={props.sx} className="background-map">
            <Image
                alt="continent" //
                layout="fill"
                src={`/images/continents/single_landmark/${props.continent}.png`}
                objectFit="contain"
                objectPosition="left"
            ></Image>
        </ContinentMapWrapper>
    );
};

export default ContinentMap;
