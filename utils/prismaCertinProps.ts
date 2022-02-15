// eslint-disable-next-line import/no-anonymous-default-export
export default <Model>(props: (keyof Model)[]): Record<keyof Model, true> => {
    const result = {} as Record<keyof Model, true>;
    props.forEach((prop) => (result[prop] = true));
    return result;
};
