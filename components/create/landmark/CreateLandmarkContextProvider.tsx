// Tools
import { useState } from "react";
import stated from "@/utils/client/stated";
import { CreateLandmarkContext } from "./context";
// Types
import type { FunctionComponent } from "react";
import type { LandmarkType } from "@prisma/client";
import type { Destination } from "@/@types/pages/create/CreateLandmark";

const CreateLandmarkContextProvider: FunctionComponent = (props) => {
    const [title, setTitle] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [shortDescription, setShortDescription] = useState<string>("");
    const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
    const [landmarkType, setLandmarkType] = useState<LandmarkType>("ANTIQUE");
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

    return (
        <CreateLandmarkContext.Provider
            value={{
                title: stated(title, setTitle),
                selectedDestination: stated(selectedDestination, setSelectedDestination),
                shortDescription: stated(shortDescription, setShortDescription),
                thumbnail: stated(thumbnail, setThumbnail),
                thumbnailURL: stated(thumbnailURL, setThumbnailURL),
                landmarkType: stated(landmarkType, setLandmarkType),
            }}
        >
            {props.children}
        </CreateLandmarkContext.Provider>
    );
};

export default CreateLandmarkContextProvider;
