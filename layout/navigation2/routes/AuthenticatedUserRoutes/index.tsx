// Tools
import { styled } from "@mui/system";
import useWindowSizes from "@/hooks/useWindowSizes";
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
    fontSize: "1.1rem",
    letterSpacing: "1px",
    cursor: "default",
    strong: {
        fontWeight: 900,
    },
}));

const GeneralRoutes: FunctionComponent<{ userData: LocalStorageUserData }> = (props) => {
    const { id, avatar, name } = props.userData;
    const { width } = useWindowSizes();

    return (
        <FlexBox vertical="center">
            {width > 1000 && <Avatar id={id} avatar={avatar}></Avatar>}
            {(() => {
                if (width > 1300) {
                    return (
                        <HelloThere className="contrast-color">
                            <span>Hello, </span>
                            <strong>{name}</strong>
                        </HelloThere>
                    );
                }
            })()}

            <Logout></Logout>
        </FlexBox>
    );
};

export default GeneralRoutes;
