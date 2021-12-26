// Tools
import { useState, useRef } from "react";
import useLayoutEffect from "@/utils/client/useLayoutEffect";
// Types
import type { FunctionComponent, ReactNode } from "react";
import type { DroppableProvided, DropResult } from "react-beautiful-dnd";
import type { StatedDataField } from "@/@types/StagedDataField";
import type { DraggableDestinationContentField } from "@/@types/DestinationDescription";
// Material UI Icons
import Box from "@mui/material/Box";
// Other components
import { DragDropContext, Droppable } from "react-beautiful-dnd";

interface ContentFieldsWrapperProps {
    children: ReactNode;
    description: StatedDataField<DraggableDestinationContentField[]>;
}

const ContentFieldsWrapper: FunctionComponent<ContentFieldsWrapperProps> = (props) => {
    const wrapper = useRef<HTMLElement | null>(null);
    const [scrollable, setScrollable] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (props.description.value.length <= 2 || wrapper.current === null) return setScrollable(false);
        const contentItemsTotalHeight = [...(document.querySelectorAll(".description-conent-field" as any) as any)].reduce((a, b) => a + b.getBoundingClientRect().height + 16, 0);
        return setScrollable(contentItemsTotalHeight > wrapper.current.offsetHeight);
    }, [wrapper, props.description.value.length]);

    const onDragEnd = (res: DropResult) => {
        const { draggableId, destination, source } = res;
        console.log(res);
        if (destination === undefined) return;

        const _clone = (a: any): any => JSON.parse(JSON.stringify(a));
        // const draggedIndex = props.description.value.findIndex((target) => target.id === draggableId) as number;
        const replacing = _clone(props.description.value[destination.index]) as DraggableDestinationContentField;
        const dragged = _clone(props.description.value[source.index]) as DraggableDestinationContentField;
        const dataWithoutDragged = props.description.value.filter((target) => target.id !== draggableId);
        const newDestinationIndex = dataWithoutDragged.findIndex((target) => target.id === replacing.id) + (destination.index > source.index ? 1 : 0);

        props.description.setValue(dataWithoutDragged.slice(0, newDestinationIndex).concat(dragged, dataWithoutDragged.slice(newDestinationIndex)));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="content-fields">
                {(provided: DroppableProvided) => {
                    return (
                        <Box
                            sx={{
                                width: "100%",
                                flexGrow: "1",
                                overflow: "hidden",
                                position: "relative",
                            }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <Box
                                ref={wrapper}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    ...(() => {
                                        if (scrollable)
                                            return {
                                                overflowY: "scroll",
                                                pr: "10px",
                                                "&::-webkit-scrollbar": { width: "10px" },
                                                "&::-webkit-scrollbar-track": { boxShadow: "inset 0 0 2px rgba(0,0,0,0.5)" },
                                                "&::-webkit-scrollbar-thumb": {
                                                    backgroundColor: (theme) => theme.palette.primary.main,
                                                    borderRadius: "2px",
                                                },
                                            };
                                    })(),
                                }}
                            >
                                {props.children}
                                {provided.placeholder}
                            </Box>
                        </Box>
                    );
                }}
            </Droppable>
        </DragDropContext>
    );
};

export default ContentFieldsWrapper;
