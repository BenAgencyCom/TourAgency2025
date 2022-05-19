// Tools
import { useState } from "react";
import CREATE_LANDMARK_RESTRICTIONS from "@/utils/restrictions/createLandmark";
// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent, ChangeEvent } from "react";
import type { Restriction } from "@/@types/Restriction";
import type { HeaderContentField } from "@/@types/Description";
// Other components
import InputWithIcon from "@/components/_utils/styled/InputWithIcon";

interface HeaderBodyProps {
    field: ListItem<HeaderContentField>;
    restrictions: Restriction;
}

const HeaderBody: FunctionComponent<HeaderBodyProps> = (props) => {
    const [newHeader, setNewHeader] = useState<string>(props.field.data.header);

    const onBlur = () => {
        props.field.changeProperty("header", newHeader);
    };
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewHeader(e.target.value);
    };

    return (
        <InputWithIcon
            value={newHeader} //
            onChange={onChange}
            onBlur={onBlur}
            sx={{ width: "100%" }}
            lengthNotification={{
                fieldName: "paragraph",
                restrictions: CREATE_LANDMARK_RESTRICTIONS.description.header,
            }}
        ></InputWithIcon>
    );
};

export default HeaderBody;
