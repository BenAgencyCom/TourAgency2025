// Types
import type { FunctionComponent, ReactNode } from "react";
// Other components
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
// Other components
import ContinueButton from "./ContinueButton";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled Components
import Header from "./styled_components/_Header";
import Wrapper from "./styled_components/Wrapper";
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";

interface SectionHeaderProps {
    mobileIcon: ReactNode;
    header: string;
    buttonMsg?: string;
    biggerHeader?: string;
    onClick?: () => void;
    url?: string;
}
const SectionHeader: FunctionComponent<SectionHeaderProps> = (props) => {
    const { buttonMsg, onClick, url } = props;
    const { width } = useAppSelector((state) => state.windowSizes);
    return (
        <UnfadeOnScroll duration={700}>
            <Wrapper>
                <Header>
                    {(() => {
                        if (width > 1000) {
                            return props.biggerHeader && <BackgroundHeader>{props.biggerHeader}</BackgroundHeader>;
                        } else {
                            return props.mobileIcon;
                        }
                    })()}
                    <span className="normal">{props.header}</span>
                </Header>

                {buttonMsg && <ContinueButton buttonMsg={buttonMsg} onClick={onClick} url={url}></ContinueButton>}
            </Wrapper>
        </UnfadeOnScroll>
    );
};

export default SectionHeader;
