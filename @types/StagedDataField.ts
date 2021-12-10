export interface StatedDataField<T> {
    value: T;
    setValue: (value: T) => void;
}
