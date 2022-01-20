import createBetterSlice from "./_redux_templates/createSliceWithListManagement";
import { Landmark } from "@/@types/Landmark";

import type {
    PayloadAction, //
    CaseReducer,
} from "@reduxjs/toolkit";

interface State {
    [msg: string]: string;
}
interface Actions {
    [updateMsg: string]: CaseReducer<State, PayloadAction<string>>;
}

const { reducer, actions, helpers } = createBetterSlice<Landmark, State, Actions>({
    name: "test",
    listBlankItem: {
        title: "",
        description: "",
        picture: null,
        type: "ANTIQUE",
        tags: [],
        pictureURL: "",
    },
    initialState: {
        msg: "JEBAC REDUXA",
    },
    customActions: {
        updateMsg: (state, action) => {
            state.msg = action.payload;
        },
    } as Actions,
});
export { actions };
export { helpers };
export default reducer;
