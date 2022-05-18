import type {
    PayloadAction, //
    SliceCaseReducers,
    CaseReducer,
    Draft,
    ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import ListItem from "./ListItem";

export interface ListState<ArrayItem> {
    list: ListItem<ArrayItem>[];
}
// CreatedActions
export interface CreatedActions<ArrayItem> {
    changeItemInList: ActionCreatorWithPayload<{
        itemToUpdate: ListItem<ArrayItem>;
        propertyToUpdate: keyof ArrayItem;
        newValue: any;
    }>;
    replaceItemInList: ActionCreatorWithPayload<{
        itemToReplace: ListItem<ArrayItem>;
        newData: ArrayItem;
    }>;
    deleteItemFromList: ActionCreatorWithPayload<ListItem<ArrayItem>>;
    swapTwoItemsInList: ActionCreatorWithPayload<{
        first: ListItem<ArrayItem>; //
        second: ListItem<ArrayItem>;
    }>;
    changeIndexOfElement: ActionCreatorWithPayload<{
        element: ListItem<ArrayItem>; //
        index: number;
    }>;
}
//
export interface ListActions<ArrayItem> extends SliceCaseReducers<ListState<ArrayItem>> {
    changeItemInList: CaseReducer<
        ListState<ArrayItem>,
        PayloadAction<{
            itemToUpdate: ListItem<ArrayItem>;
            propertyToUpdate: keyof Draft<ArrayItem>;
            newValue: any;
        }>
    >;
    replaceItemInList: CaseReducer<
        ListState<ArrayItem>,
        PayloadAction<{
            itemToReplace: ListItem<ArrayItem>;
            newData: Draft<ArrayItem>;
        }>
    >;
    deleteItemFromList: CaseReducer<
        ListState<ArrayItem>, //
        PayloadAction<ListItem<ArrayItem>>
    >;
    swapTwoItemsInList: CaseReducer<
        ListState<ArrayItem>, //
        PayloadAction<{
            first: ListItem<ArrayItem>;
            second: ListItem<ArrayItem>;
        }>
    >;
    changeIndexOfElement: CaseReducer<
        ListState<ArrayItem>, //
        PayloadAction<{
            element: ListItem<ArrayItem>;
            index: number;
        }>
    >;
    //
    _addItem: CaseReducer<
        ListState<ArrayItem>,
        PayloadAction<{
            newItemData: Partial<ArrayItem> | ArrayItem;
            actions: CreatedActions<ArrayItem>;
            explicit?: boolean;
        }>
    >;
}
