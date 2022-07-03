// Tools
// Types
import type { Feedback } from "@prisma/client";
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Tooltip from "@mui/material/Tooltip";
// Other components
import Thumb from "./Thumb";

interface LikesWithTooltipsProps {
    amountOfLikes: StatedDataField<number>;
    amountOfDislikes: StatedDataField<number>;
    authenticatedUserChoice: StatedDataField<Feedback | null>;
    sendRequest: (feedback: Feedback) => Promise<void>;
}

const LikesWithTooltips: FunctionComponent<LikesWithTooltipsProps> = (props) => {
    const { authenticatedUserChoice, amountOfLikes, amountOfDislikes } = props;

    const handleLike = async () => {
        if (authenticatedUserChoice.value === "LIKE") {
            authenticatedUserChoice.setValue(null);
            amountOfLikes.setValue((val) => val - 1);
        } else if (authenticatedUserChoice.value === "DISLIKE") {
            authenticatedUserChoice.setValue("LIKE");
            amountOfLikes.setValue((val) => val + 1);
            amountOfDislikes.setValue((val) => val - 1);
        } else {
            authenticatedUserChoice.setValue("LIKE");
            amountOfLikes.setValue((val) => val + 1);
        }
        await props.sendRequest("LIKE");
    };

    const handleDislike = async () => {
        if (authenticatedUserChoice.value === "DISLIKE") {
            authenticatedUserChoice.setValue(null);
            amountOfDislikes.setValue((val) => val - 1);
        } else if (authenticatedUserChoice.value === "LIKE") {
            authenticatedUserChoice.setValue("DISLIKE");
            amountOfDislikes.setValue((val) => val + 1);
            amountOfLikes.setValue((val) => val - 1);
        } else {
            authenticatedUserChoice.setValue("DISLIKE");
            amountOfDislikes.setValue((val) => val + 1);
        }
        await props.sendRequest("DISLIKE");
    };

    return (
        <>
            <Tooltip
                title={authenticatedUserChoice.value === "LIKE" ? "Unlike it!" : "Like it!"} //
                placement="top"
                onClick={handleLike}
            >
                <Thumb
                    type="LIKE" //
                    feedback={amountOfLikes.value}
                    authenticatedUserChoice={authenticatedUserChoice.value}
                />
            </Tooltip>
            <Tooltip
                title={authenticatedUserChoice.value === "DISLIKE" ? "Undislike it!" : "Dislike it!"} //
                placement="top"
                onClick={handleDislike}
            >
                <Thumb
                    type="DISLIKE" //
                    feedback={amountOfDislikes.value}
                    authenticatedUserChoice={authenticatedUserChoice.value}
                />
            </Tooltip>
        </>
    );
};

export default LikesWithTooltips;
