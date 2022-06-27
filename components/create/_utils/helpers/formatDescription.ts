// Types
import { FieldType } from "@/@types/Description";
import type { DescriptionContentField, ImageContentField } from "@/@types/Description";
import ListItem from "@/redux/slices/_redux_templates/createSliceWithListManagement/ListItem";

interface FormatDescriptionParams {
    body: FormData;
    description: ListItem<DescriptionContentField>[];
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (params: FormatDescriptionParams): string => {
    const { body, description } = params;

    let descriptionCounter = 0;

    const handleImageField = (field: ImageContentField): ImageContentField => {
        const fieldsCopy = Object.assign({}, field);
        const imageName = `description_${++descriptionCounter}`;
        body.append(imageName, fieldsCopy.src as File);
        fieldsCopy.url = imageName;
        fieldsCopy.src = null;
        return fieldsCopy;
    };

    return JSON.stringify(
        description.map((target) => {
            const copy = Object.assign({}, target.data);

            if (copy.type === FieldType.IMAGE) return handleImageField(copy);
            else if (copy.type === FieldType.SPLITTED) {
                if (copy.left.type === FieldType.IMAGE) copy.left = handleImageField(copy.left);
                if (copy.right.type === FieldType.IMAGE) copy.right = handleImageField(copy.right);
            }
            return copy;
        })
    );
};
