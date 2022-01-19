import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

const _keepStoringChanges = <T>(localStorageKey: string, value: T, setValue: Dispatch<SetStateAction<T>>) => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
    setValue(value);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default <T>(localStorageKey: string, initValue: T): [T, (val: T) => void] => {
    try {
        const dataFromLocalStorage = localStorage.getItem(localStorageKey);
        if (!dataFromLocalStorage) throw new Error();

        const [value, _setValue] = useState(JSON.parse(dataFromLocalStorage) as T);
        return [value, (val: T) => _keepStoringChanges(localStorageKey, val, () => _setValue(val))];
    } catch (e) {
        const [value, _setValue] = useState(initValue);
        return [value, (val: T) => _keepStoringChanges(localStorageKey, val, () => _setValue(val))];
    }
};
