// Tools
import { createSlice } from "@reduxjs/toolkit";
import createListReducer from "./listReducer";
import store from "@/redux/store";
// Types
import type { SliceCaseReducers } from "@reduxjs/toolkit";
import { ListState, ListActions } from "./@types";

interface CreateSliceParams<ArrayItem, CustomState> {
    name: string;
    listBlankItem: ArrayItem;
    initialState: CustomState;
    customActions: Record<string, any>;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default <
    ArrayItem, //
    CustomState extends Record<string, unknown> = {},
    CustomActions extends Record<string, unknown> = {}
>(
    sliceParams: CreateSliceParams<ArrayItem, CustomState>
) => {
    type State = ListState<ArrayItem> & CustomState;
    type Actions = ListActions<ArrayItem> & CustomActions & SliceCaseReducers<State>;

    const listReducer = createListReducer<ArrayItem>(sliceParams.listBlankItem);

    const slice = createSlice<State, Actions>({
        name: sliceParams.name,
        initialState: {
            ...sliceParams.initialState,
            ...listReducer.state,
        },
        reducers: {
            ...listReducer.actions,
            ...sliceParams.customActions,
        } as any,
    });
    // Actions for helpers:
    const { changeItemInList, replaceItemInList, deleteItemFromList, swapTwoItemsInList, changeIndexOfElement, _addItem, ...rest } = slice.actions;

    const addItem = (newItemData: Partial<ArrayItem>, explicit: boolean = false) => {
        store.dispatch(
            (_addItem as any)({
                actions: { changeItemInList, deleteItemFromList, replaceItemInList, swapTwoItemsInList, changeIndexOfElement },
                newItemData: newItemData,
                explicit,
            })
        );
    };

    return {
        reducer: slice.reducer,
        actions: slice.actions,
        helpers: { addItem },
    };
};
