// Tools
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

    const amountOfWordsInDescription: number = (() => {
        const { length } = props.data.title;
        if (length > 40) return 35;
        else if (length > 23) return 60;
        return 120;
    })();

    return (
        <>
            <LocalizationBreadCrumbs crumbs={[destination.country, destination.city]} sx={{ fontSize: "1.2rem", justifyContent: "flex-start" }}></LocalizationBreadCrumbs>
            <h3>{title}</h3>
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
