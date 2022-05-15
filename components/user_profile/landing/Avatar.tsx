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
    ["@media (max-width:1300px)"]: {
        width: "450px",
        height: "450px",
    },
    ["@media (max-width:1000px)"]: {
        width: "500px",
        height: "500px",
        marginBottom: "50px",
    },
    ["@media (max-width:600px)"]: {
        width: "450px",
        height: "450px",
    },
    ["@media (max-width:500px)"]: {
        width: "400px",
        height: "400px",
    },
    ["@media (max-width:420px)"]: {
        width: "350px",
        height: "350px",
    },
    ["@media (max-width:370px)"]: {
        width: "320px",
        height: "320px",
    },
    ["@media (max-width:330px)"]: {
        width: "290px",
        height: "290px",
    },
}));
const UserAvatar: FunctionComponent<{ avatar: string }> = (props) => {
    return <StyledAvatar src={avatarURL(props.avatar, "large")}></StyledAvatar>;
};

export default UserAvatar;
