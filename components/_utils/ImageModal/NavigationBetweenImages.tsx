// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Button from "@mui/material/Button";
// Material UI Icons
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
// Styled components
import NavigationBetweenImagesBase from "./styled_components/NavigationBetweenImagesBase";

interface NavigationBetweenImagesProps {
    imagesInTotal: number;
    imageIndex: StatedDataField<number>;
}

const NavigationBetweenImages: FunctionComponent<NavigationBetweenImagesProps> = (props) => {
    const { imagesInTotal, imageIndex } = props;
    return (
        <NavigationBetweenImagesBase className="navigation">
            <Button onClick={() => props.imageIndex.setValue((val) => val - 1)} disabled={imageIndex.value === 0}>
                <ArrowBackIos />
            </Button>

            <strong>
                {imageIndex.value + 1}/{imagesInTotal}
            </strong>
            <Button onClick={() => imageIndex.setValue((val) => val + 1)} disabled={imageIndex.value === imagesInTotal - 1}>
                <ArrowForwardIos />
            </Button>
        </NavigationBetweenImagesBase>
    );
};

export default NavigationBetweenImages;
