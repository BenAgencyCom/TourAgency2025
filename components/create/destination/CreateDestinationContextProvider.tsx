// Tools
import { useState } from "react";
import stated from "@/utils/client/stated";
import { CreateDestinationContext } from "./context";
// Types
import type { FunctionComponent } from "react";
import type { Continent } from "@prisma/client";
import type { CountryType } from "@/data/countries";

const CreateDestinationContextProvider: FunctionComponent = (props) => {
    const [city, setCity] = useState<string>("");
    const [population, setPopulation] = useState<number>(0);
    const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [continent, setContinent] = useState<Continent>("Europe");
    const [country, setCountry] = useState<CountryType | null>(null);
    const [shortDescription, setShortDescription] = useState<string>("");

    return (
        <CreateDestinationContext.Provider
            value={{
                city: stated(city, setCity),
                continent: stated(continent, setContinent),
                country: stated(country, setCountry),
                population: stated(population, setPopulation),
                shortDescription: stated(shortDescription, setShortDescription),
                thumbnail: stated(thumbnail, setThumbnail),
                thumbnailURL: stated(thumbnailURL, setThumbnailURL),
            }}
        >
            {props.children}
        </CreateDestinationContext.Provider>
    );
};

export default CreateDestinationContextProvider;
