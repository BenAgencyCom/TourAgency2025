// Tools
import { useState, useEffect } from "react";
import useLayoutEffect from "@/hooks/useLayoutEffect";
// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent, ReactNode, MutableRefObject } from "react";
import type { DroppableProvided, DropResult } from "react-beautiful-dnd";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { DescriptionContentField } from "@/@types/Description";
// Material UI Icons
import Box from "@mui/material/Box";
// Other components
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// Redux
import { useAppSelector } from "@/hooks/useRedux";

interface DefaultWrapperProps {
    wrapper: MutableRefObject<HTMLElement | null>;
    children: ReactNode;
    amountOfContentFields: number;
    _scrollableKey: number;
    onDragEnd: (res: DropResult) => void;
}

const DefaultWrapper: FunctionComponent<DefaultWrapperProps> = (props) => {
    const height = useAppSelector((state) => state.windowSizes.height);
    const [scrollable, setScrollable] = useState<boolean>(true);

    const handleScrollableSetting = () => {
        if (props.wrapper.current === null) return setScrollable(false);
        const contentItemsTotalHeight = [...(document.querySelectorAll(".description-content-field" as any) as any)].reduce((a, b) => a + b.getBoundingClientRect().height + 16, 0);
        setScrollable(contentItemsTotalHeight > props.wrapper.current.offsetHeight);
    };
    useEffect(() => handleScrollableSetting());
    useLayoutEffect(handleScrollableSetting, [props.wrapper, props.amountOfContentFields, props._scrollableKey, height]);

    return (
        <DragDropContext onDragEnd={props.onDragEnd}>
            <Droppable droppableId="content-fields">
                {(provided: DroppableProvided) => {
                    return (
                        <Box
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            id="content-fields-wrapper"
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
                    );
                }}
            </Droppable>
        </DragDropContext>
    );
};

export default DefaultWrapper;
