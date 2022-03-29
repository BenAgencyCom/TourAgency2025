import type { LandmarkPictureResolution, DestinationPictureResolution } from "@/@types/pages/destinations/SingleDestination";

type AvatarResolution = "thumbnail" | "small" | "medium" | "large";

export const avatarURL = (folder: string, resolution: AvatarResolution): string => {
    return `/upload/avatars/${folder}/${resolution}.jpg`;
};

export const landmarkPictureURL = (picture: string, resolution: LandmarkPictureResolution): string => {
    return `/upload/landmarks/${picture}/${resolution}.jpg`;
};

export const destinationPictureURL = (picture: string, resolution: DestinationPictureResolution, type: "thumbnail" | "content"): string => {
    return `/upload/destinations/${picture}/${type}/${resolution}.jpg`;
};
