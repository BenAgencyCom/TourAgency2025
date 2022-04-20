// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type LocalStorageUserData from "@/@types/LocalStorageUserData";
// Other components
import Logout from "./Logout";
import Avatar from "./Avatar";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const HelloThere = styled("span")(({ theme }) => ({
    marginLeft: "20px",
    fontSize: "1.2rem",
    letterSpacing: "1px",
    cursor: "default",
    strong: {
        fontWeight: 900,
    },
}));

const GeneralRoutes: FunctionComponent<{ userData: LocalStorageUserData }> = (props) => {
    const { id, avatar, name } = props.userData;

    return (
        <FlexBox vertical="center">
            <Avatar id={id} avatar={avatar}></Avatar>
            <HelloThere className="contrast-color">
                <span>Hello, </span>
                <strong>{name}</strong>
            </HelloThere>
            <Logout></Logout>
        </FlexBox>
    );
};

export default GeneralRoutes;
