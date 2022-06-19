// Types
import type { FunctionComponent } from "react";
import type { Landmark } from "@/@types/pages/admin/create_destination/Landmark";
import type { LandmarkType } from "@prisma/client";
import { ListItem } from "@/@types/redux";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Other components
import Select from "@/components/register/stage_1/PersonalData/Select";
import Tags from "./edit_mode_utils/Tags";
import Title from "./edit_mode_utils/Title";
import Description from "./edit_mode_utils/Description";
import Picture from "./edit_mode_utils/Picture";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";

interface EditModeProps {
    tabIndex: number;
    landmark: ListItem<Landmark>;
}

const EditMode: FunctionComponent<EditModeProps> = (props) => {
    const { data } = props.landmark;

    const updateData = (prop: keyof Landmark, value: Landmark[typeof prop]) => {
        props.landmark.changeProperty(prop, value);
    };

    return (
        <Fade in={true}>
            <Box className={styles["single-destination"]} sx={{ p: 2 }}>
                <Title title={data.title} tabIndex={props.tabIndex} updateData={updateData}></Title>

                <Tags landmark={props.landmark} tabIndex={props.tabIndex}>
                    <Select
                        label="Landmark type" //
                        value={data.type}
                        tabIndex={props.tabIndex}
                        sx={{ width: "280px", mr: 1 }}
                        options={["RESTAURANT", "MONUMENT", "ANTIQUE", "RELIC", "ART", "NATURE"]}
                        updateValue={(val) => updateData("type", val as LandmarkType)}
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
