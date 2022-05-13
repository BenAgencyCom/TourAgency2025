import type { StatedDataField } from "@/@types/StatedDataField";

/**
 * Merges both `value` and `setValue` from `React.useState` in one object, that can be subsequently easily passed further down in DOM
 */

const stated = <T>(value: T, setValue: (value: T) => void): StatedDataField<T> => {
    return { value, setValue };
};

export default stated;
