// Tools
import { useMemo } from "react";
import useWindowSizes from "@/hooks/useWindowSizes";
import { GetLandmarkIcon } from "@/utils/client/getLandmarkIcon";
// Types
import type { FunctionComponent } from "react";
import type { Landmark } from "@/@types/pages/destinations/SingleDestination";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other Components
import LocalizationBreadCrumbs from "@/components/_utils/LocalizationBreadCrumbs";

interface LandmarkInformationProps {
    data: Landmark;
}

const LandmarkInformation: FunctionComponent<LandmarkInformationProps> = (props) => {
    const { destination, title, shortDescription, type } = props.data;
    const { width } = useWindowSizes();

    const amountOfWordsInDescription = useMemo<number>(() => {
        if (width < 900) return 150;

        const { length } = title;
        if (length > 40) return 35;
        else if (length > 23) return 60;
        return 100;
    }, [width, title]);

    return (
        <>
            <LocalizationBreadCrumbs crumbs={[destination.country, destination.city]} sx={{ justifyContent: "flex-start" }}></LocalizationBreadCrumbs>
            <Typography variant="h3" sx={{ mb: "5px" }}>
                {title}
            </Typography>
            <span className="landmark-type">{GetLandmarkIcon(type)}</span>
            {(() => {
                if (amountOfWordsInDescription) {
                    return (
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                            {shortDescription.slice(0, amountOfWordsInDescription)}...
                        </Typography>
                    );
                }
            })()}
        </>
    );
};

export default LandmarkInformation;
