// Types
import type { FunctionComponent } from "react";
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
            <span className="main-text">{props.main}</span>
            <BackgroundHeader fontSize="8rem">{props.backgroundHeader}</BackgroundHeader>
        </MainHeader>
    );
};

export default Header;
