import ListItem from "./ListItem";
import { ListActions } from "./types";
import type { Draft } from "@reduxjs/toolkit";

export interface ListState<ArrayItem> {
    list: ListItem<ArrayItem>[];
}

// eslint-disable-next-line import/no-anonymous-default-export
export default <ArrayItem>(
    blankItem: ArrayItem
): {
    state: { list: ListItem<ArrayItem>[] };
    actions: ListActions<ArrayItem>;
} => {
    return {
        state: {
            list: [],
        },
        actions: {
            _addItem: (state, action) => {
                const { newItemData, actions } = action.payload;
                const newArrayItem: ArrayItem = Object.assign({}, blankItem);
                // Distinguish and extract all optionally provided properties and then apply them
                const blankItemKeys = Object.keys(newArrayItem);
                for (const key in newItemData) {
                    if (blankItemKeys.includes(key)) (newArrayItem as any)[key] = newItemData[key];
                }

                state.list.push(new ListItem(newArrayItem, actions) as unknown as Draft<ListItem<ArrayItem>>);
            },
            replaceItemInList: (state, action) => {
                const { newData, itemToReplace } = action.payload;

                state.list = state.list.map((item) => {
                    if (item.id === itemToReplace.id) item.data = newData;
                    return item;
                });
            },
            changeItemInList: (state, action) => {
                const { propertyToUpdate, newValue, itemToUpdate } = action.payload;
                state.list = state.list.map((item) => {
                    if (item.id === itemToUpdate.id) {
                        item.data[propertyToUpdate] = newValue;
                    }
                    return item;
                });
            },
            deleteItemFromList: (state, action) => {
                const { id } = action.payload;
                state.list = state.list.filter((item) => {
                    return id !== item.id;
                });
            },
        },
    };
};
