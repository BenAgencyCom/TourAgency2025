import { useRef, useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import type { FunctionComponent } from "react";
import type { CountryType } from "@/data/countries";
// My components
import StepHeader from "@/components/register/stepper/StepHeader";
import StepNavigaton from "@/components/register/stepper/StepNavagation";
// Material UI components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
// Other Components
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
// Material UI icons
import RocketLaunch from "@mui/icons-material/RocketLaunch";
// Redux
import { setAuthentication } from "@/redux/slices/authentication";
import { useAppDispatch } from "@/redux/hooks";
// Styles
import styles from "@/sass/pages/register.module.sass";

interface DataToForm {
    name: string;
    surname: string;
    country: CountryType | null;
    gender: "MALE" | "FEMALE" | "OTHER";
    born: Date | null;
    password: string;
    passwordRepeatation: string;
    email: string;
    avatar: File | null;
}
interface UploadProps extends DataToForm {
    // Auxiliary stuff
    buttonStyles: Record<string, any>;
    currentSlideIndex: number;
    updateSlideIndex: (x: number) => void;
}

const Upload: FunctionComponent<UploadProps> = (props) => {
    const dispatch = useAppDispatch();
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const [RECAPTCHAVerified, SetRECAPTCHAVerified] = useState<boolean>(false);
    const body = new FormData();
    ["name", "surname", "gender", "born", "password", "passwordRepeatation", "email"].forEach((key) => body.append(key, (props as any)[key]));
    ["country"].forEach((key) => body.append(key, JSON.stringify((props as any)[key])));
    if (props.avatar instanceof File) body.append("avatar", props.avatar);
    //
    const upload = async () => {
        if (!RECAPTCHAVerified) return;
        await axios.post("./api/auth/register", body, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        Router.push("/");
        dispatch(setAuthentication(null));
    };
    useEffect(() => (recaptchaRef.current as ReCAPTCHA).reset(), []);
    const onReCAPTCHAChange = (captchaCode: unknown) => {
        if (!captchaCode) {
            return SetRECAPTCHAVerified(false);
        }
        SetRECAPTCHAVerified(true);
    };

    return (
        <Fade in={true}>
            <Box className={styles["content-wrapper"]} sx={{ alignItems: "center", maxWidth: "none !important" }}>
                <StepHeader
                    header="One more step" //
                    icon={<RocketLaunch className={styles.icon}></RocketLaunch>}
                ></StepHeader>

                <Typography variant="h5" sx={{ cursor: "default", px: 5, textAlign: "center", mb: 2 }}>
                    By continuing I agree with the
                    <Typography sx={{ color: "primary.main" }} component="span" variant="h5">
                        <Link href="/terms-of-use">
                            <a target="_blank"> Terms of Use and Privacy Policy.</a>
                        </Link>
                    </Typography>
                </Typography>

                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                    onChange={onReCAPTCHAChange} //
                    theme="dark"
                />

                {/* <span onClick={upload}>Button upload</span> */}
                <StepNavigaton
                    currentSlideIndex={props.currentSlideIndex} //
                    updateSlideIndex={props.updateSlideIndex}
                    blockContinue={!RECAPTCHAVerified}
                    continueAction={upload}
                ></StepNavigaton>
            </Box>
        </Fade>
    );
};

export default Upload;
