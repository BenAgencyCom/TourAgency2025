export default interface LocalStorageUserData {
    id: string;
    name: string;
    surname: string;
    avatar: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    country: {
        name: string;
        code: string;
    };
    isAdmin?: true;
}
