// Tools
import { styled } from "@mui/system";
import { useRef } from "react";
// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent, ReactNode } from "react";
import type { DropResult } from "react-beautiful-dnd";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { DescriptionContentField } from "@/@types/Description";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import DefaultWrapper from "@/components/admin/create_destination/description/fields_wrapper/DefaultWrapper";
import Fullscreen from "@/components/admin/create_destination/description/fields_wrapper/Fullscreen";
// Styled components
const MainWrapper = styled(Box)(() => ({
    width: "100%",
    flexGrow: "1",
    overflow: "hidden",
    position: "relative",
}));

interface ContentFieldsWrapperProps {
    children: ReactNode;
    fullscreen: StatedDataField<boolean>;
    description: ListItem<DescriptionContentField>[];
    _scrollableKey: number;
}

const ContentFieldsWrapper: FunctionComponent<ContentFieldsWrapperProps> = (props) => {
    const wrapper = useRef<HTMLElement | null>(null);

    const onDragEnd = (res: DropResult) => {
        const { destination, source } = res;
        if (destination === null || destination === undefined || source.index === destination.index) return;

        props.description[destination.index].swapWith(props.description[source.index]);
    };

    return (
        <MainWrapper ref={wrapper}>
            {(() => {
                if (!props.fullscreen.value) {
                    return (
                        <DefaultWrapper
                            amountOfContentFields={props.description.length} //
                            _scrollableKey={props._scrollableKey}
                            onDragEnd={onDragEnd}
                            wrapper={wrapper}
                        >
                            {props.children}
                        </DefaultWrapper>
                    );
                } else
                    return (
                        <Fullscreen onDragEnd={onDragEnd} fullscreen={props.fullscreen}>
                            {props.children}
                        </Fullscreen>
                    );
            })()}
        </MainWrapper>
    );
};

export default ContentFieldsWrapper;
