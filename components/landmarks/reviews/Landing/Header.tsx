// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Styled components
import { MainHeader } from "@/components/_utils/styled/pages/BulkReviews";
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";

interface HeaderProps {
    main: string;
    backgroundHeader: string;
}
const Header: FunctionComponent<HeaderProps> = (props) => {
    return (
        <MainHeader>
            <Typography className="main-text" variant="h1">
                {props.main}
            </Typography>
            <BackgroundHeader fontSize="8rem">{props.backgroundHeader}</BackgroundHeader>
        </MainHeader>
    );
};

export default Header;