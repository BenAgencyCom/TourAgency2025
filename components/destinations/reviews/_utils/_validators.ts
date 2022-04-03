export const isTypeOK = (type?: any): boolean => {
    return (type && type !== "all" && ["POSITIVE", "NEGATIVE", "MIXED"].includes(type)) as boolean;
};

export const isOrderOK = (order?: any): boolean => {
    return (order && ["newest", "oldest", "best", "worst"].includes(order)) as boolean;
};
