import { createSlice } from "@reduxjs/toolkit";
import type {
    PayloadAction, //
    SliceCaseReducers,
    CaseReducer,
    Draft,
    Slice,
} from "@reduxjs/toolkit";

type ListItem<ArrayItem> = { id: string } & ArrayItem;
interface State<ArrayItem> {
    list: ListItem<ArrayItem>[];
}

interface Reducers<State, ArrayItem> extends SliceCaseReducers<State> {
    addItem: CaseReducer<State, PayloadAction<Partial<Draft<Partial<ArrayItem>>>>>;
    changeItem: CaseReducer<
        State,
        PayloadAction<{
            itemToUpdate: ListItem<ArrayItem>;
            valueToUpdate: keyof Draft<ListItem<ArrayItem>>;
            newValue: any;
        }>
    >;
    deleteItem: CaseReducer<
        State,
        PayloadAction<{
            itemToDelete: Draft<ListItem<ArrayItem>>;
        }>
    >;
}
interface Params<ArrayItem> {
    name: string;
    blankItem: ArrayItem;
    initialState?: ArrayItem[];
}
type Returns<ArrayItem> = Slice<State<ArrayItem>, Reducers<State<ArrayItem>, ArrayItem>>;

// eslint-disable-next-line import/no-anonymous-default-export
export default <ArrayItem>(params: Params<ArrayItem>): Returns<ArrayItem> => {
    type SliceState = State<ArrayItem>;

    const initialList = params.initialState
        ? params.initialState.map((target, index) => {
              (target as any).id = `init-${params.name}-${index}`;
              return target;
          })
        : [];

    const slice = createSlice<SliceState, Reducers<SliceState, ArrayItem>>({
        name: params.name,
        initialState: {
            list: initialList as ListItem<ArrayItem>[],
        },
        reducers: {
            addItem: (state, action) => {
                const newArrayItem: ArrayItem = Object.assign({}, params.blankItem);

                // Distinguish and extract all optionally provided properties and then apply them
                const blankItemKeys = Object.keys(newArrayItem);
                for (const key in action.payload) {
                    if (blankItemKeys.includes(key)) (newArrayItem as any)[key] = action.payload[key];
                }

                state.list.push({
                    id: `${params.name}-${Date.now()}`,
                    ...newArrayItem,
                } as Draft<ListItem<ArrayItem>>);
            },
            changeItem: (state, action) => {
                const { valueToUpdate, newValue, itemToUpdate } = action.payload;

                state.list = state.list.map((item) => {
                    if (item.id === itemToUpdate.id) {
                        item[valueToUpdate] = newValue;
                    }
                    return item;
                });
            },
            deleteItem: (state, action) => {
                const { itemToDelete } = action.payload;

                state.list = state.list.filter((item) => {
                    return itemToDelete.id !== item.id;
                });
            },
        },
    });

    return slice;
};
