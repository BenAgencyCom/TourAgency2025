import type { LandmarkPictureResolution } from "@/@types/pages/destinations/SingleDestination";

type AvatarResolution = "thumbnail" | "small" | "medium" | "large";

export const avatarURL = (folder: string, resolution: AvatarResolution): string => {
    return `/upload/avatars/${folder}/${resolution}.jpg`;
};

export const landmarkPictureURL = (picture: string, resolution: LandmarkPictureResolution): string => {
    return `/upload/landmarks/${picture}/${resolution}.jpg`;
};
