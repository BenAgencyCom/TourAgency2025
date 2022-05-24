import store from "@/redux/store";
import createBetterSlice from "@/redux/slices/_redux_templates/createSliceWithListManagement";
import { DescriptionContentField, HeaderContentField, ParagraphContentField, SplittedContentField, ImageContentField } from "@/@types/Description";
import { FieldType } from "@/@types/Description";
import { PayloadAction, CaseReducer } from "@reduxjs/toolkit";

interface CustomState extends StringKeyedObject {
    previewMode: boolean;
    newFieldType: FieldType;
    /** Disable **entire** navigation between stages */
    disableNavigation: boolean;
    /**
     * Short message whill is going to be displayed on right side of **continue** button,
     * informing user of the reason behind blocking access to change the step
     */
    reasonBehindBlockingNavigation: string;
}
interface CustomActions extends StringKeyedObject {
    updateNewFieldType: CaseReducer<CustomState, PayloadAction<FieldType>>;
    setPreviewMode: CaseReducer<CustomState, PayloadAction<boolean>>;
    /**
     * This function sets both `disableNavigation` and
     * `reasonBehindBlockingNavigation` properties at the same time
     *
     * The only parameter is an object containing following properties:
     * - `disableNavigation`- self evident
     * - `reason`- abbreviation for `reasonBehindBlockingNavigation`. Received value will be assigned to this property.
     *
     */
    handleValidationResult: CaseReducer<
        CustomState,
        PayloadAction<{
            disableNavigation: boolean;
            reason: string;
        }>
    >;
}

const {
    reducer,
    actions,
    helpers: _helpers,
} = createBetterSlice<DescriptionContentField, CustomState, CustomActions>({
    name: "createContent",
    listBlankItem: {
        type: FieldType.HEADER,
        header: "",
    },
    initialState: {
        newFieldType: FieldType.HEADER,
        disableNavigation: true,
        reasonBehindBlockingNavigation: "",
        previewMode: false,
    },
    customActions: {
        setPreviewMode: (state, action) => {
            state.previewMode = action.payload;
        },
        updateNewFieldType: (state, action) => {
            state.newFieldType = action.payload;
        },
        handleValidationResult: (state, action) => {
            state.disableNavigation = action.payload.disableNavigation;
            state.reasonBehindBlockingNavigation = action.payload.reason;
        },
    } as CustomActions,
});
// Define own helpers
const createContentField = (newFieldType: FieldType): DescriptionContentField => {
    const createField = <T extends DescriptionContentField>(data: Omit<T, "type">, propType?: FieldType): T => {
        const type = propType ? propType : (newFieldType as FieldType);
        const dataToBeAdded = { type, ...data };
        return dataToBeAdded as T;
    };

    switch (newFieldType) {
        case FieldType.HEADER:
            return createField<HeaderContentField>({ header: "" });
        case FieldType.PARAGRAPH:
            return createField<ParagraphContentField>({ content: "" });
        case FieldType.IMAGE:
            return createField<ImageContentField>({ src: null, url: null });
        case FieldType.SPLITTED:
            return createField<SplittedContentField>({
                left: createField<ParagraphContentField>({ content: "" }, FieldType.PARAGRAPH), //
                right: createField<ImageContentField>({ src: null, url: null }, FieldType.IMAGE), //
            });
    }
};

export const helpers = {
    createContentField,
    addItem: (newFieldType: FieldType) => {
        _helpers.addItem(createContentField(newFieldType), true);
    },
    addItemWithAutomaticType: () => {
        _helpers.addItem(createContentField(store.getState().createContent.newFieldType), true);
    },
};

export { actions };
export default reducer;
