// Types
import type { FunctionComponent } from "react";
// Other components
import Section from "@/components/destinations/single/_utils/Section";
import SingleDestinationContent from "@/components/destinations/single/description/SingleDestinationContent";
// Redux
import { useAppSelector } from "@/hooks/useRedux";

const DestinationWrapper: FunctionComponent = () => {
    const { description, folder, country } = useAppSelector((state) => state.singleDestination.data);
    const imageLoader = (url: string): string => `/upload/destinations/${folder}/description/${url}/1080p.jpg`;

    return (
        <Section
            id="description"
            background={`#121212`}
            header={{
                text: "WORDS OF INTRODUCTION", //
                buttonMsg: `More in ${country}`,
                onClick: () => {},
            }}
        >
            <SingleDestinationContent
                data={description} //
                imageLoader={imageLoader}
            ></SingleDestinationContent>
        </Section>
    );
};

export default DestinationWrapper;
