import type { FunctionComponent } from "react";
import type { CountryType } from "@/data/countries";
import axios from "axios";

interface DataToForm {
    name: string;
    surname: string;
    country: CountryType | null;
    sex: "MALE" | "FEMALE" | "OTHER";
    born: Date | null;
    password: string;
    passwordRepeatation: string;
    email: string;
    avatar: File | null;
}
interface UploadProps extends DataToForm {
    // Auxiliary stuff
    buttonStyles: Record<string, any>;
}

const Upload: FunctionComponent<UploadProps> = (props) => {
    const body = new FormData();
    ["name", "surname", "sex", "born", "password", "passwordRepeatation", "email", "avatar"].forEach((key) => body.append(key, (props as any)[key]));
    ["country"].forEach((key) => body.append(key, JSON.stringify((props as any)[key])));
    //
    const upload = async () => {
        await axios.post("./api/auth/register", body, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
    };

    return (
        <>
            <span onClick={upload}>Button upload</span>
        </>
    );
};

export default Upload;
