// Tools
import { styled } from "@mui/system";
import { avatarURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Avatar from "@mui/material/Avatar";
// Styled
const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: "500px",
    height: "500px",
}));
const UserAvatar: FunctionComponent<{ avatar: string }> = (props) => {
    return <StyledAvatar src={avatarURL(props.avatar, "large")}></StyledAvatar>;
};

export default UserAvatar;
