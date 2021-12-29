// Tools
import { styled } from "@mui/system";
import { useRef } from "react";
// Types
import { FieldType } from "@/@types/DestinationDescription";
import type { FunctionComponent, ReactNode } from "react";
import type { DropResult } from "react-beautiful-dnd";
import type { StatedDataField } from "@/@types/StagedDataField";
import type { DraggableDestinationContentField } from "@/@types/DestinationDescription";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import DefaultWrapper from "@/components/admin/create_destination/description/fields_wrapper/DefaultWrapper";
import Fullscreen from "@/components/admin/create_destination/description/fields_wrapper/Fullscreen";
// Styled components
const MainWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    flexGrow: "1",
    overflow: "hidden",
    position: "relative",
}));

interface ContentFieldsWrapperProps {
    children: ReactNode;
    fullscreen: StatedDataField<boolean>;
    description: StatedDataField<DraggableDestinationContentField[]>;
    _scrollableKey: number;
    // For fullscreen header
    newContentFieldType: StatedDataField<FieldType>;
    addNewContentField: () => void;
    setFullscreen: StatedDataField<boolean>["setValue"];
}

const ContentFieldsWrapper: FunctionComponent<ContentFieldsWrapperProps> = (props) => {
    const wrapper = useRef<HTMLElement | null>(null);

    const onDragEnd = (res: DropResult) => {
        const { draggableId, destination, source } = res;
        if (destination === null || destination === undefined || source.index === destination.index) return;

        const _clone = (a: any): any => JSON.parse(JSON.stringify(a));

        const replacing = _clone(props.description.value[destination.index]) as DraggableDestinationContentField;
        const dragged = _clone(props.description.value[source.index]) as DraggableDestinationContentField;
        const dataWithoutDragged = props.description.value.filter((target) => target.id !== draggableId);
        const newDestinationIndex = dataWithoutDragged.findIndex((target) => target.id === replacing.id) + (destination.index > source.index ? 1 : 0);

        props.description.setValue(dataWithoutDragged.slice(0, newDestinationIndex).concat(dragged, dataWithoutDragged.slice(newDestinationIndex)));
    };

    return (
        <MainWrapper ref={wrapper}>
            {(() => {
                if (!props.fullscreen.value) {
                    return (
                        <DefaultWrapper
                            description={props.description} //
                            _scrollableKey={props._scrollableKey}
                            onDragEnd={onDragEnd}
                            wrapper={wrapper}
                        >
                            {props.children}
                        </DefaultWrapper>
                    );
                } else
                    return (
                        <Fullscreen
                            description={props.description} //
                            _scrollableKey={props._scrollableKey}
                            onDragEnd={onDragEnd}
                            fullscreen={props.fullscreen}
                            addNewContentField={props.addNewContentField}
                            newContentFieldType={props.newContentFieldType}
                        >
                            {props.children}
                        </Fullscreen>
                    );
            })()}
        </MainWrapper>
    );
};

export default ContentFieldsWrapper;
