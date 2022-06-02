// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Other components
import Thumb from "./Thumb";

interface LikesWithTooltipsProps {
    amountOfLikes: number;
    amountOfDislikes: number;
}

const LikesWithTooltips: FunctionComponent<LikesWithTooltipsProps> = (props) => {
    return (
        <>
            <Thumb
                type="LIKE" //
                feedback={props.amountOfLikes}
            />
            <Thumb
                type="DISLIKE" //
                feedback={props.amountOfDislikes}
            />
        </>
    );
};

export default LikesWithTooltips;
