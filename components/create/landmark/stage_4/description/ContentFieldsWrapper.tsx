// Tools
import { styled } from "@mui/system";
import { useRef } from "react";
// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent, ReactNode } from "react";
import type { DescriptionContentField } from "@/@types/Description";
import type { DroppableProvided, DropResult } from "react-beautiful-dnd";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// Styled components
const MainWrapper = styled(Box)(() => ({
    width: "100%",
    flexGrow: "1",
    overflow: "hidden",
    position: "relative",
}));

interface ContentFieldsWrapperProps {
    children: ReactNode;
    description: ListItem<DescriptionContentField>[];
    _scrollableKey: number;
}

const ContentFieldsWrapper: FunctionComponent<ContentFieldsWrapperProps> = (props) => {
    const wrapper = useRef<HTMLElement | null>(null);

    const onDragEnd = (res: DropResult) => {
        const { destination, source } = res;
        if (destination === null || destination === undefined || source.index === destination.index) return;
        props.description[source.index].changeIndex(destination.index > source.index ? destination.index + 1 : destination.index);
    };

    return (
        <MainWrapper ref={wrapper}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="content-fields">
                    {(provided: DroppableProvided) => {
                        return (
                            <Box ref={provided.innerRef} {...provided.droppableProps} id="content-fields-wrapper">
                                {props.children}
                                {provided.placeholder}
                            </Box>
                        );
                    }}
                </Droppable>
            </DragDropContext>
        </MainWrapper>
    );
};

export default ContentFieldsWrapper;
