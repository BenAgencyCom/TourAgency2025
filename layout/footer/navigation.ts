import type { Navigation } from "./@types";
// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        title: "Product",
        fields: [
            {
                page: "Features",
                url: "",
            },
            {
                page: "Code samples",
                url: "",
            },
            {
                page: "Testing",
                url: "",
            },
            {
                page: "Documentation",
                url: "",
            },
        ],
    },
    {
        title: "Company",
        fields: [
            {
                page: "Portfolio",
                url: "https://github.com/BenAgencyCom",
                openInNewTab: true,
            },
            {
                page: "Github",
                url: "https://github.com/BenAgencyCom",
                openInNewTab: true,
            },
            {
                page: "About me",
                url: "",
            },
            {
                page: "Contact form",
                url: "",
            },
        ],
    },
    {
        title: "Resources",
        fields: [
            {
                page: "Blogs",
                url: "",
            },
            {
                page: "Video tutorials",
                url: "",
            },
            {
                page: "Case studies",
                url: "",
            },
            {
                page: "Sitemap",
                url: "",
            },
        ],
    },
] as Navigation[];
