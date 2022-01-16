// Types
import type { FunctionComponent } from "react";
import type { Landmark } from "@/@types/Landmark";
import type { LandmarkType } from "@prisma/client";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Other components
import Select from "@/components/register/_formFields/Select";
import Tags from "./edit_mode_utils/Tags";
import Title from "./edit_mode_utils/Title";
import Description from "./edit_mode_utils/Description";
import Picture from "./edit_mode_utils/Picture";
// Redux
import { useAppDispatch } from "@/redux/hooks";
import { changeItem } from "@/redux/slices/landmarks";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";

interface EditModeProps {
    tabIndex: number;
    data: { id: string } & Landmark;
}

const EditMode: FunctionComponent<EditModeProps> = (props) => {
    const dispatch = useAppDispatch();
    const { data } = props;
    const updateData = (prop: keyof Landmark, value: Landmark[typeof prop]) => {
        dispatch(
            changeItem({
                itemToUpdate: props.data,
                valueToUpdate: prop,
                newValue: value,
            })
        );
    };

    const updateType = (type: LandmarkType) => updateData("type", type);

    return (
        <Fade in={true}>
            <Box className={styles["single-destination"]} sx={{ p: 2 }}>
                <Title title={data.title} tabIndex={props.tabIndex} updateData={updateData}></Title>

                <Tags data={data} updateData={updateData} tabIndex={props.tabIndex}>
                    <Select
                        label="Landmark type" //
                        value={data.type}
                        tabIndex={props.tabIndex}
                        sx={{ width: "280px", mr: 1 }}
                        options={["RESTAURANT", "MONUMENT", "ANTIQUE", "RELIC", "ART", "NATURE"]}
                        updateValue={(val) => updateType(val as LandmarkType)}
                    ></Select>
                </Tags>

                <Picture
                    picture={data.picture} //
                    pictureURL={data.pictureURL}
                    updateData={updateData}
                    tabIndex={props.tabIndex}
                ></Picture>

                <Description description={data.description} tabIndex={props.tabIndex} updateData={updateData}></Description>
            </Box>
        </Fade>
    );
};

export default EditMode;
