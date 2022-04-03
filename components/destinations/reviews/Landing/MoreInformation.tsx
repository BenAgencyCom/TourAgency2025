// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Other components
import Link from "next/link";
// Styled components
import ButtonWithLineTransition from "@/components/_utils/styled/ButtonWithLineTransition";

const MoreInformationButton = styled(ButtonWithLineTransition)(({ theme }) => ({
    alignSelf: "flex-end",
    width: "200px",
    fontSize: "1.1rem",
    padding: "10px 20px",
}));
const MoreInformation: FunctionComponent<{ slug: string }> = (props) => {
    return (
        <Link href={`/destinations/${props.slug}`}>
            <a href="" style={{ alignSelf: "flex-end" }}>
                <MoreInformationButton line="right" reverse>
                    <span>More information</span>
                </MoreInformationButton>
            </a>
        </Link>
    );
};

export default MoreInformation;
