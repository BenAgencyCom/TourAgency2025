![img](https://redux.js.org/img/redux-logo-landscape.png)

# How to use this exquisite piece of technology:

---

### 📚 Guide step by step

##### 1. Firstable create a `@redux/toolkit` slice:

```ts
import ArraySliceTemplate from "./_redux_templates/ArraySliceTemplate";
import type { Landmark } from "@/@types/Landmark";

const landmarksSLice = ArraySliceTemplate<Landmark>({
    name: "landmarks",
    blankItem: {
        title: "",
        description: "",
        picture: null,
        type: "ANTIQUE",
        tags: [],
        pictureURL: "",
    },
});

const { addItem, changeItem, deleteItem } = landmarksSLice.actions;
export { addItem, changeItem, deleteItem };

export default landmarksSLice;
```

##### 2. That's all, redux can be actually simple and developer friendly.

One auxiliary type:

```ts
type ListItem<ArrayItem> = { id: string } & ArrayItem;
```

The **ENTIRE** slice's state:

```ts
interface State<ArrayItem> {
    list: ListItem<ArrayItem>[];
}
```

And **ALL** reducers as well: _(types simplified syntax)_:

```ts
interface Reducers {
    addItem: (Partial<ArrayItem>) => void;
    changeItem: ({
        itemToUpdate: ListItem<ArrayItem>;
        valueToUpdate: keyof ListItem<ArrayItem>;
        newValue: any;
    }) => void;
    deleteItem: ({itemToDelete: ListItem<ArrayItem>}) => void
}
```

---

### 🚀 Data managing via my redux framework

```ts
import { addItem, changeItem, deleteItem } from "@/redux/slices/landmarks";
```

##### 1. Add item to list

```ts
dispatch(
    addItem({
        title: "My approach is god damn awasome",
        description: "Wenn das money kommt",
    })
);
```

##### 2. Modify current element

```ts
dispatch(
    changeItem({
        itemToUpdate: list[1],
        valueToUpdate: "title",
        newValue: "A totally nagelneu new title",
    })
);
```

##### 3. Delete an list's element

```ts
dispatch(
    deleteItem({
        itemToDelete: landmarks[index],
    })
);
```
