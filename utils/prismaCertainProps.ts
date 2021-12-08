type PrismaCertainProps = { select: Record<string, true> } | Record<string, true>;

export const prismaCertainProps = (props: string[], raw: boolean = false): PrismaCertainProps => {
    const result: Record<string, true> = {};
    props.forEach((el) => (result[el] = true));
    if (raw) return result;
    return {
        select: result,
    };
};
