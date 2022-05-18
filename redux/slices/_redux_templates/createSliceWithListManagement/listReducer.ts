import ListItem from "./ListItem";
import { ListActions } from "./@types";
import type { Draft } from "@reduxjs/toolkit";

export interface ListState<ArrayItem> {
    list: ListItem<ArrayItem>[];
}
type NeccessaryInformationToHandleSwap<ArrayItem> = {
    id: string;
    data: ArrayItem;
};

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
                const { newItemData, actions, explicit } = action.payload;
                if (!explicit) {
                    const newArrayItem: ArrayItem = Object.assign({}, blankItem);
                    // Distinguish and extract all optionally provided properties and then apply them
                    const blankItemKeys = Object.keys(newArrayItem);
                    for (const key in newItemData as Partial<ArrayItem>) {
                        if (blankItemKeys.includes(key)) (newArrayItem as any)[key] = newItemData[key];
                    }
                    state.list.push(new ListItem(newArrayItem, actions) as unknown as Draft<ListItem<ArrayItem>>);
                } else {
                    state.list.push(new ListItem(newItemData as ArrayItem, actions) as unknown as Draft<ListItem<ArrayItem>>);
                }
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
            swapTwoItemsInList: (state, action) => {
                const { first, second } = action.payload;
                const firstObject: NeccessaryInformationToHandleSwap<ArrayItem> = {
                    data: Object.assign({}, first.data),
                    id: first.id,
                };
                const secondObject: NeccessaryInformationToHandleSwap<ArrayItem> = {
                    data: Object.assign({}, second.data),
                    id: second.id,
                };
                state.list = state.list.map((target) => {
                    if (target.id === firstObject.id) {
                        target.data = secondObject.data as Draft<ArrayItem>;
                        target.id = secondObject.id;
                    } else if (target.id === secondObject.id) {
                        target.data = firstObject.data as Draft<ArrayItem>;
                        target.id = firstObject.id;
                    }

                    return target;
                });
            },
            changeIndexOfElement: (state, action) => {
                const { element, index } = action.payload;

                state.list = [
                    ...state.list.slice(0, index).filter((el) => el.id !== element.id), //
                    element,
                    ...state.list.slice(index).filter((el) => el.id !== element.id),
                ] as any;
            },
        },
    };
};
