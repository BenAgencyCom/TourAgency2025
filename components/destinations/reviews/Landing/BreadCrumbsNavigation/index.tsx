// Types
import type { FunctionComponent } from "react";
import type { Destination } from "@/@types/pages/destinations/Reviews";
// Other components
import SingleBreadCrumb from "./SingleBreadCrumb";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface BreadcrumbsNavigationProps {
    destination: Destination;
}
const BreadcrumbsNavigation: FunctionComponent<BreadcrumbsNavigationProps> = (props) => {
    const { country, continent, city, slug } = props.destination;

    return (
        <FlexBox vertical="center" sx={{ userSelect: "none", position: "relative", zIndex: 2 }}>
            <SingleBreadCrumb>{continent}</SingleBreadCrumb>
            <SingleBreadCrumb url={`/destinations/${slug}`}>{country}</SingleBreadCrumb>
            <SingleBreadCrumb active>{city}</SingleBreadCrumb>
        </FlexBox>
    );
};

export default BreadcrumbsNavigation;
