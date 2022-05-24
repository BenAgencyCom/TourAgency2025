// Types
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/Description";
// Other components
import DescriptionFieldIcon from "@/components/create/_utils/forms/DescriptionFieldIcon";

interface SingleContentFieldHeaderTextProps {
    currentType: FieldType;
    index: number;
}

const SingleContentFieldHeaderText: FunctionComponent<SingleContentFieldHeaderTextProps> = (props) => {
    const { currentType, index } = props;

    const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1).toLowerCase();

    return (
        <h4>
            <DescriptionFieldIcon fieldType={currentType} />
            <span>
                Field <span className="primary">{index + 1}</span> / <strong>{capitalize(FieldType[currentType])}</strong>
            </span>
        </h4>
    );
};

export default SingleContentFieldHeaderText;
