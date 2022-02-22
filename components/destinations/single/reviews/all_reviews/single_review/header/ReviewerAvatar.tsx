// Tools
import { useState } from "react";
import { avatarURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Avatar from "@mui/material/Avatar";

interface ReviewerAvatarProps {
    avatar: string | null;
}

const ReviewerAvatar: FunctionComponent<ReviewerAvatarProps> = (props) => {
    const [avatarSize, setAvatarSize] = useState<string>("80px");

    if (props.avatar) {
        return (
            <Avatar
                src={avatarURL(props.avatar, "small")} //
                sx={{ width: avatarSize, height: avatarSize, mx: "20px" }}
            ></Avatar>
        );
    } else
        return (
            <Avatar
                sx={{ width: avatarSize, height: avatarSize, color: "white", mx: "20px" }} //
            ></Avatar>
        );
};

export default ReviewerAvatar;
