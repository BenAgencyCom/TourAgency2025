// Tools
import { styled } from "@mui/system";
import { useState, useEffect, useRef, useMemo } from "react";
import useLayoutEffect from "@/hooks/useLayoutEffect";
// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent, ReactNode } from "react";
import type { DescriptionContentField } from "@/@types/Description";
import type { DroppableProvided, DropResult } from "react-beautiful-dnd";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
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
    const height = useAppSelector((state) => state.windowSizes.height);
    const description = useAppSelector((state) => state.createContent.list);
    const wrapper = useRef<HTMLElement | null>(null);
    const [scrollable, setScrollable] = useState<boolean>(true);
    const amounfOfContentFields = useMemo<number>(() => props.description.length, [props.description]);

    const onDragEnd = (res: DropResult) => {
        const { destination, source } = res;
        if (destination === null || destination === undefined || source.index === destination.index) return;
        props.description[source.index].changeIndex(destination.index);
        // props.description[destination.index].swapWith(props.description[source.index]);
    };

    const handleScrollableSetting = () => {
        if (wrapper.current === null) return setScrollable(false);
        const contentItemsTotalHeight = [...(document.querySelectorAll(".description-conent-field" as any) as any)].reduce((a, b) => a + b.getBoundingClientRect().height + 16, 0);
        setScrollable(contentItemsTotalHeight > wrapper.current.offsetHeight);
    };
    useEffect(() => handleScrollableSetting());
    useLayoutEffect(handleScrollableSetting, [wrapper, amounfOfContentFields, props._scrollableKey, height]);

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
