// Types
import { FieldType } from "@/@types/DestinationDescription";
import type { FunctionComponent } from "react";
import type { SplittedSubfieldField } from "@/@types/DestinationDescription";
// Other components
import Paragraph from "@/components/destinations/single/description/Paragraph";
import ImageField from "@/components/destinations/single/description/Image";

interface SplittedSubfiledProps {
    data: SplittedSubfieldField;
    imageLoader: (url: string) => string;
}

const SplittedSubfiled: FunctionComponent<SplittedSubfiledProps> = (props) => {
    switch (props.data.type) {
        case FieldType.PARAGRAPH:
            return (
                <Paragraph
                    split //
                    data={props.data}
                ></Paragraph>
            );
        case FieldType.IMAGE:
            return (
                <ImageField
                    split //
                    imageURL={props.imageLoader(props.data.url as string)}
                ></ImageField>
            );
    }
};

export default SplittedSubfiled;
