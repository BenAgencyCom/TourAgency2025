type AvatarResolution = "thumbnail" | "small" | "medium" | "large";
export const avatarURL = (folder: string, resolution: AvatarResolution): string => {
    return `/upload/avatars/${folder}/${resolution}.jpg`;
};
