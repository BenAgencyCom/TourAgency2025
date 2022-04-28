import createBetterSlice from "@/redux/slices/_redux_templates/createSliceWithListManagement";
import { Landmark } from "@/@types/pages/admin/create_destination/Landmark";

const { reducer, actions, helpers } = createBetterSlice<Landmark>({
    name: "landmarks",
    listBlankItem: {
        title: "",
        description: "",
        picture: null,
        type: "ANTIQUE",
        tags: [],
        pictureURL: "",
    },
    initialState: {},
    customActions: {},
});
export { actions };
export { helpers };
export default reducer;
