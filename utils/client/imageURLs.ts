import type { LandmarkPictureResolution, DestinationPictureResolution } from "@/@types/pages/destinations/SingleDestination";

type AvatarResolution = "thumbnail" | "small" | "medium" | "large";

export const avatarURL = (folder: string, resolution: AvatarResolution): string => {
    return `/upload/avatars/${folder}/${resolution}.jpg`;
};

export const landmarkPictureURL = (folder: string, resolution: LandmarkPictureResolution, type: "thumbnail" | "content"): string => {
    return `/upload/landmarks/${folder}/${type}/${resolution}.jpg`;
};

export const destinationPictureURL = (folder: string, resolution: DestinationPictureResolution, type: "thumbnail" | "content"): string => {
    return `/upload/destinations/${folder}/${type}/${resolution}.jpg`;
};
