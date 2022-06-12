// eslint-disable-next-line import/no-anonymous-default-export
export default (params: { url: string; modalMaxResolution?: string }): string => {
    if (params.url.slice(0, 10) === "data:image") return params.url;
    const originalURLSplitted = params.url.split("/");
    const imageExtension = params.url.split(".")[1];
    originalURLSplitted[originalURLSplitted.length - 1] = `${params.modalMaxResolution}.${imageExtension}`;
    return originalURLSplitted.join("/");
};
