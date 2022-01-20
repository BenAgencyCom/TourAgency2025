import { CreatedActions } from "./types";
import store from "@/redux/store";

export interface ListItemInterface<T> {
    id: string;
    data: T;

    changeProperty: (propertyToUpdate: keyof T, newValue: T[typeof propertyToUpdate]) => void;
    replace: (newData: T) => void;
    remove: () => void;
    swapWith: (elementToBeSwapped: ListItem<T>) => void;
}

class ListItem<T extends Record<string, any>> implements ListItemInterface<T> {
    public id: string;
    public constructor(
        public data: T, //
        private actions: CreatedActions<T>
    ) {
        this.id = String(Date.now());
    }

    public changeProperty(propertyToUpdate: keyof T, newValue: T[typeof propertyToUpdate]) {
        store.dispatch(
            this.actions.changeItemInList({
                itemToUpdate: this,
                propertyToUpdate,
                newValue,
            })
        );
    }
    public replace(newData: T) {
        store.dispatch(
            this.actions.replaceItemInList({
                itemToReplace: this,
                newData,
            })
        );
    }
    public remove() {
        store.dispatch(this.actions.deleteItemFromList(this));
    }
    public swapWith(elementToBeSwapped: ListItem<T>) {
        const swappedData = JSON.parse(JSON.stringify(elementToBeSwapped.data));
        const originalData = JSON.parse(JSON.stringify(this.data));
        store.dispatch(
            this.actions.replaceItemInList({
                itemToReplace: elementToBeSwapped,
                newData: originalData,
            })
        );
        store.dispatch(
            this.actions.replaceItemInList({
                itemToReplace: this,
                newData: swappedData,
            })
        );
    }
}

export default ListItem;
