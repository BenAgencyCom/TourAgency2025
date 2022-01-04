export enum FieldType {
    HEADER,
    PARAGRAPH,
    IMAGE,
    SPLITTED,
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
export type SplittedSubfieldField = ParagraphContentField | ImageContentField;
export interface SplittedContentField {
    type: FieldType.SPLITTED;
    left: SplittedSubfieldField;
    right: SplittedSubfieldField;
}

export type DestinationContentField = HeaderContentField | ParagraphContentField | ImageContentField | SplittedContentField;

// react-beautiful-dnd
interface Draggable {
    id: string;
}
export type DraggableHeaderContentField = Draggable & HeaderContentField;
export type DraggableParagraphContentField = Draggable & ParagraphContentField;
export type DraggableImageContentField = Draggable & ImageContentField;
export type DraggableSplittedContentField = Draggable & SplittedContentField;
export type DraggableDestinationContentField = DraggableHeaderContentField | DraggableParagraphContentField | DraggableImageContentField | DraggableSplittedContentField;
