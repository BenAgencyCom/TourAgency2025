// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Styled components
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";
import MainHeader from "@/components/_utils/BulkReviews/styled_components/MainHeader";

interface HeaderProps {
    main: string;
    backgroundHeader: string;
}
const Header: FunctionComponent<HeaderProps> = (props) => {
    return (
        <MainHeader>
            <Typography
                className={[
                    "main-text", //
                    props.main.length > 30 ? "long-text" : "",
                ].join(" ")} //
                variant="h1"
            >
                {props.main}
            </Typography>
            <BackgroundHeader fontSize="6rem">{props.backgroundHeader}</BackgroundHeader>
        </MainHeader>
    );
};

export default Header;
