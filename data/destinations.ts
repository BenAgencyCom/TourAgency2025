export interface TravelDestination {
    id: number;
    country: string;
    continent: string;
    city: string;
    description: string;
    backgroundSrc: string;
    length: {
        days: number;
        nights: number;
    };
    review: number;
    price: number;
    informationsAbout: {
        label: string;
        content: string;
    }[];
}

export default [
    {
        id: 0,
        country: "France",
        continent: "Europe",
        city: "Paris",
        description: "An artistic capital with iconic landmarks, romantic ambiance, and gourmet cuisine in Western Europe",
        backgroundSrc: "/images/france.jpg",
        length: {
            days: 5,
            nights: 4,
        },
        review: 4.71,
        price: 639.99,
        informationsAbout: [
            {
                label: "Select campaign settings",
                content: `For each ad campaign that you create, you can control how much
                        you're willing to spend on clicks and conversions, which networks
                        and geographical locations you want your ads to show on, and more.`,
            },
            {
                label: "Create an ad group",
                content: "An ad group contains one or more ads which target a shared set of keywords.",
            },
            {
                label: "Create an ad",
                content: `Try out different ad text to see what brings in the most customers,
                        and learn how to enhance your ads using features like ad extensions.
                        If you run into any problems with your ads, find out how to tell if
                        they're running and how to resolve approval issues.`,
            },
        ],
    },
    {
        id: 1,
        country: "United Arab Emirates",
        continent: "Africa",
        city: "Abu Dhabi",
        description: "A desert oasis with futuristic architecture and a rich cultural heritage in the Middle East",
        backgroundSrc: "/images/abu_dhabi.jpg",
        length: {
            days: 2,
            nights: 1,
        },
        review: 5.0,
        price: 728.99,
        informationsAbout: [
            {
                label: "Ich erzähle die Typen",
                content: `FIch sage den Jungs da draußen, dass sie für mich Huren sind
                Wie ich ankündige, nehme ich meine Brille ab`,
            },
            {
                label: "Du wirst sehen, dass etwas passiert",
                content:
                    "Ich werde Kerzen für sie anzünden, wenn sie nicht mehr bei uns sind Ich lande besser hier bei den Farmazons Keiner von euch wird mit Gewehren hierher kommen Nicht mit Türklinken, erschreckt die alten Damen",
            },
            {
                label: "Alte Babes mit Gewehren erschrecken",
                content: `Ich würde nicht einmal diese Baba Yaga mit einem Stock schlagen wollen
                Es gab keinen Kunden, der nicht gehen wollte
                Keine fünf Minuten sind hier vergangen und der Glaube liegt hinter uns
                Du wickelst diese Pasta, ich mache die alten Regeln`,
            },
            {
                label: "Keine fünf Minuten sind hier",
                content: `Ich würde nicht einmal diese Baba Yaga mit einem Stock schlagen wollen
                Es gab keinen Kunden, der nicht gehen wollte
                Keine fünf Minuten sind hier vergangen und der Glaube liegt hinter uns
                Du wickelst diese Pasta, ich mache die alten Regeln`,
            },
        ],
    },
    {
        id: 2,
        country: "Poland",
        continent: "Europe",
        city: "Kraków",
        description: "A European gem, known for its historic charm, medieval streets, and royal traditions",
        backgroundSrc: "/images/krakow.jpg",
        length: {
            days: 7,
            nights: 6,
        },
        review: 3.93,
        price: 1070.0,
        informationsAbout: [
            {
                label: "Select campaign settings",
                content: `For each ad campaign that you create, you can control how much
                        you're willing to spend on clicks and conversions, which networks
                        and geographical locations you want your ads to show on, and more.`,
            },
            {
                label: "Create an ad group",
                content: "An ad group contains one or more ads which target a shared set of keywords.",
            },
            {
                label: "Create an ad",
                content: `Try out different ad text to see what brings in the most customers,
                        and learn how to enhance your ads using features like ad extensions.
                        If you run into any problems with your ads, find out how to tell if
                        they're running and how to resolve approval issues.`,
            },
        ],
    },
    {
        id: 3,
        country: "Germany",
        continent: "Europe",
        city: "München",
        description: "A Bavarian hub blending old-world traditions with technological innovation, famous for beer and culture.",
        backgroundSrc: "/images/munchen.jpg",
        length: {
            days: 7,
            nights: 6,
        },
        review: 3.93,
        price: 1070.0,
        informationsAbout: [
            {
                label: "Select campaign settings",
                content: `For each ad campaign that you create, you can control how much
                        you're willing to spend on clicks and conversions, which networks
                        and geographical locations you want your ads to show on, and more.`,
            },
            {
                label: "Create an ad group",
                content: "An ad group contains one or more ads which target a shared set of keywords.",
            },
            {
                label: "Create an ad",
                content: `Try out different ad text to see what brings in the most customers,
                        and learn how to enhance your ads using features like ad extensions.
                        If you run into any problems with your ads, find out how to tell if
                        they're running and how to resolve approval issues.`,
            },
        ],
    },
] as TravelDestination[];
