export enum FieldType {
    HEADER,
    PARAGRAPH,
    IMAGE,
}
export interface HeaderContentField {
    type: FieldType.HEADER;
    header: string;
}

export interface ParagraphContentField {
    type: FieldType.PARAGRAPH;
    content: string;
}

export interface ImageContentField {
    type: FieldType.IMAGE;
    src: File | null;
    url: string | null;
}
export type DestinationContentField = HeaderContentField | ParagraphContentField | ImageContentField;

// react-beautiful-dnd
interface Draggable {
    id: string;
}
export type DraggableHeaderContentField = Draggable & HeaderContentField;
export type DraggableParagraphContentField = Draggable & ParagraphContentField;
export type DraggableImageContentField = Draggable & ImageContentField;
export type DraggableDestinationContentField = DraggableHeaderContentField | DraggableParagraphContentField | DraggableImageContentField;
