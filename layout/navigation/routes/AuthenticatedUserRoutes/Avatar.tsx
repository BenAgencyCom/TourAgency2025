// Tools
import { useState } from "react";
import { styled } from "@mui/system";
import { avatarURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
// Other components
import Link from "next/link";

interface UserAvatarProps {
    avatar: string | null;
    id: string;
}

const GreenDot = styled("div")(({ theme }) => ({
    position: "absolute",
    width: "15px",
    height: "15px",
    background: "#44bd32",
    borderRadius: "10px",
    bottom: "0",
    right: "0",
    zIndex: 1,
}));

const UserAvatar: FunctionComponent<UserAvatarProps> = (props) => {
    const [avatarSize, setAvatarSize] = useState<string>("50px");

    return (
        <Link href={`/user/${props.id}`} passHref>
            <Box sx={{ position: "relative" }}>
                <GreenDot></GreenDot>
                {(() => {
                    if (props.avatar) {
                        return (
                            <Avatar
                                src={avatarURL(props.avatar, "small")} //
                                sx={{ width: avatarSize, height: avatarSize, cursor: "pointer" }}
                            ></Avatar>
                        );
                    } else {
                        return (
                            <Avatar
                                sx={{ width: avatarSize, height: avatarSize, color: "white", cursor: "pointer" }} //
                            ></Avatar>
                        );
                    }
                })()}
            </Box>
        </Link>
    );
};

export default UserAvatar;
