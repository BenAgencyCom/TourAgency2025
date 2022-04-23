// Tools
import { useState } from "react";
import { avatarURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
// Other components
import Link from "next/link";

interface ReviewerAvatarProps {
    avatar: string | null;
    id: string;
}

const ReviewerAvatar: FunctionComponent<ReviewerAvatarProps> = (props) => {
    const [avatarSize, setAvatarSize] = useState<string>("80px");

    return (
        <Link href={`/user/${props.id}`} passHref>
            <Tooltip title="Visit profile" placement="top">
                {(() => {
                    if (props.avatar) {
                        return (
                            <Avatar
                                src={avatarURL(props.avatar, "small")} //
                                sx={{ width: avatarSize, height: avatarSize, mx: "20px", cursor: "pointer" }}
                                className="landmark-reviewer-avatar"
                            ></Avatar>
                        );
                    } else {
                        return (
                            <Avatar
                                sx={{ width: avatarSize, height: avatarSize, color: "white", mx: "20px", cursor: "pointer" }} //
                                className="landmark-reviewer-avatar"
                            ></Avatar>
                        );
                    }
                })()}
            </Tooltip>
        </Link>
    );
};

export default ReviewerAvatar;
