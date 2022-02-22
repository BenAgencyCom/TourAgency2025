import type { SeederDataList, Destination } from "./@types";
import type { DestinationContentField, HeaderContentField, ParagraphContentField, ImageContentField, SplittedContentField } from "../../@types/DestinationDescription";

export default [
    {
        id: "KRAKOW",
        city: "Kraków",
        continent: "Europe",
        country: "Poland",
        countryCode: "pl",
        folder: "krakow",
        _imagesDir: "destinations/krakow",
        population: 700000,
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis convallis nisl, id scelerisque nisi condimentum a. Nam porta, risus.",
        slug: "krakow",
        description: JSON.parse(
            JSON.stringify([
                {
                    type: 2,
                    src: null,
                    url: "description_1",
                } as ImageContentField,
                {
                    type: 0,
                    header: "Lorem ipsum dolor sit amet, consectetur porttitor.",
                } as HeaderContentField,
                {
                    type: 1,
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec nibh vitae diam pellentesque aliquet ac sed mauris. Praesent rhoncus nibh facilisis metus ullamcorper egestas. Donec vitae accumsan massa. Sed blandit maximus sodales. Vivamus dapibus, ex nec tempor volutpat, ligula libero lacinia tellus, fermentum hendrerit erat magna vel nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec nisi nunc, dictum eget velit nec, suscipit euismod risus. Vivamus in tortor gravida, pellentesque lacus sed, sagittis felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer imperdiet leo eget mi sollicitudin, ac tincidunt sapien tristique. Ut venenatis velit quam, ut pharetra elit commodo a. Nulla facilisi. Duis in justo id odio congue semper. Praesent vel ullamcorper nisi, in ultrices sem. Vivamus tempus viverra tortor, a ornare arcu tincidunt non. Vivamus sit amet turpis nec urna bibendum dignissim. Ut quis scelerisque dolor. Etiam imperdiet accumsan.",
                } as ParagraphContentField,
                {
                    type: 3,
                    left: {
                        type: 1,
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat enim vel libero molestie, ut efficitur nulla consequat. Curabitur efficitur arcu eget odio commodo tempus. Pellentesque commodo sodales arcu, id pretium arcu pellentesque id. Nunc vitae suscipit nisi. Proin accumsan gravida ullamcorper. Curabitur vulputate fermentum dui. Donec nisl dui, convallis eu neque a, facilisis pretium elit. Proin ac tincidunt lorem, vel porta nunc. Nunc rutrum lectus nec purus faucibus hendrerit. Donec gravida.",
                    } as ParagraphContentField,
                    right: {
                        type: 2,
                        src: null,
                        url: "description_2",
                    } as ImageContentField,
                } as SplittedContentField,
                {
                    type: 0,
                    header: "Phasellus diam libero, fringilla sed mauris ut.",
                } as HeaderContentField,
                {
                    type: 1,
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec nibh vitae diam pellentesque aliquet ac sed mauris. Praesent rhoncus nibh facilisis metus ullamcorper egestas. Donec vitae accumsan massa. Sed blandit maximus sodales. Vivamus dapibus, ex nec tempor volutpat, ligula libero lacinia tellus, fermentum hendrerit erat magna vel nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec nisi nunc, dictum eget velit nec, suscipit euismod risus. Vivamus in tortor gravida, pellentesque lacus sed, sagittis felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer imperdiet leo eget mi sollicitudin, ac tincidunt sapien tristique. Ut venenatis velit quam, ut pharetra elit commodo a. Nulla facilisi. Duis in justo id odio congue semper. Praesent vel ullamcorper nisi, in ultrices sem. Vivamus tempus viverra tortor, a ornare arcu tincidunt non. Vivamus sit amet turpis nec urna bibendum dignissim. Ut quis scelerisque dolor. Etiam imperdiet accumsan.",
                } as ParagraphContentField,
                {
                    type: 3,
                    left: {
                        type: 2,
                        src: null,
                        url: "description_3",
                    } as ImageContentField,
                    right: {
                        type: 1,
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat enim vel libero molestie, ut efficitur nulla consequat. Curabitur efficitur arcu eget odio commodo tempus. Pellentesque commodo sodales arcu, id pretium arcu pellentesque id. Nunc vitae suscipit nisi. Proin accumsan gravida ullamcorper. Curabitur vulputate fermentum dui. Donec nisl dui, convallis eu neque a, facilisis pretium elit. Proin ac tincidunt lorem, vel porta nunc. Nunc rutrum lectus nec purus faucibus hendrerit. Donec gravida.",
                    } as ParagraphContentField,
                } as SplittedContentField,
            ] as DestinationContentField[])
        ),
    },
    {
        id: "WARSZAWA",
        city: "Warszawa",
        continent: "Europe",
        country: "Poland",
        countryCode: "pl",
        folder: "warszawa",
        _imagesDir: "destinations/warszawa",
        population: 1700000,
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis convallis nisl, id scelerisque nisi condimentum a. Nam porta, risus.",
        slug: "wwa",
        description: JSON.parse(
            JSON.stringify([
                {
                    type: 2,
                    src: null,
                    url: "description_1",
                } as ImageContentField,
                {
                    type: 0,
                    header: "Lorem ipsum dolor sit amet, consectetur porttitor.",
                } as HeaderContentField,
                {
                    type: 1,
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec nibh vitae diam pellentesque aliquet ac sed mauris. Praesent rhoncus nibh facilisis metus ullamcorper egestas. Donec vitae accumsan massa. Sed blandit maximus sodales. Vivamus dapibus, ex nec tempor volutpat, ligula libero lacinia tellus, fermentum hendrerit erat magna vel nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec nisi nunc, dictum eget velit nec, suscipit euismod risus. Vivamus in tortor gravida, pellentesque lacus sed, sagittis felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer imperdiet leo eget mi sollicitudin, ac tincidunt sapien tristique. Ut venenatis velit quam, ut pharetra elit commodo a. Nulla facilisi. Duis in justo id odio congue semper. Praesent vel ullamcorper nisi, in ultrices sem. Vivamus tempus viverra tortor, a ornare arcu tincidunt non. Vivamus sit amet turpis nec urna bibendum dignissim. Ut quis scelerisque dolor. Etiam imperdiet accumsan.",
                } as ParagraphContentField,
                {
                    type: 3,
                    left: {
                        type: 1,
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat enim vel libero molestie, ut efficitur nulla consequat. Curabitur efficitur arcu eget odio commodo tempus. Pellentesque commodo sodales arcu, id pretium arcu pellentesque id. Nunc vitae suscipit nisi. Proin accumsan gravida ullamcorper. Curabitur vulputate fermentum dui. Donec nisl dui, convallis eu neque a, facilisis pretium elit. Proin ac tincidunt lorem, vel porta nunc. Nunc rutrum lectus nec purus faucibus hendrerit. Donec gravida.",
                    } as ParagraphContentField,
                    right: {
                        type: 2,
                        src: null,
                        url: "description_2",
                    } as ImageContentField,
                } as SplittedContentField,
                {
                    type: 0,
                    header: "Phasellus diam libero, fringilla sed mauris ut.",
                } as HeaderContentField,
                {
                    type: 1,
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec nibh vitae diam pellentesque aliquet ac sed mauris. Praesent rhoncus nibh facilisis metus ullamcorper egestas. Donec vitae accumsan massa. Sed blandit maximus sodales. Vivamus dapibus, ex nec tempor volutpat, ligula libero lacinia tellus, fermentum hendrerit erat magna vel nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec nisi nunc, dictum eget velit nec, suscipit euismod risus. Vivamus in tortor gravida, pellentesque lacus sed, sagittis felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer imperdiet leo eget mi sollicitudin, ac tincidunt sapien tristique. Ut venenatis velit quam, ut pharetra elit commodo a. Nulla facilisi. Duis in justo id odio congue semper. Praesent vel ullamcorper nisi, in ultrices sem. Vivamus tempus viverra tortor, a ornare arcu tincidunt non. Vivamus sit amet turpis nec urna bibendum dignissim. Ut quis scelerisque dolor. Etiam imperdiet accumsan.",
                } as ParagraphContentField,
                {
                    type: 3,
                    left: {
                        type: 2,
                        src: null,
                        url: "description_3",
                    } as ImageContentField,
                    right: {
                        type: 1,
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat enim vel libero molestie, ut efficitur nulla consequat. Curabitur efficitur arcu eget odio commodo tempus. Pellentesque commodo sodales arcu, id pretium arcu pellentesque id. Nunc vitae suscipit nisi. Proin accumsan gravida ullamcorper. Curabitur vulputate fermentum dui. Donec nisl dui, convallis eu neque a, facilisis pretium elit. Proin ac tincidunt lorem, vel porta nunc. Nunc rutrum lectus nec purus faucibus hendrerit. Donec gravida.",
                    } as ParagraphContentField,
                } as SplittedContentField,
            ] as DestinationContentField[])
        ),
    },
] as SeederDataList<Destination>;
