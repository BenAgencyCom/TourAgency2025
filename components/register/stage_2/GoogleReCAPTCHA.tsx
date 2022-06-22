// Tools
import { useState, useRef, useEffect } from "react";
// Types
import type { FunctionComponent } from "react";
// Other components
import ReCAPTCHA from "react-google-recaptcha";

interface GoogleReCAPTCHAProps {
    //
}

const GoogleReCAPTCHA: FunctionComponent<GoogleReCAPTCHAProps> = (props) => {
    const [RECAPTCHAVerified, setRECAPTCHAVerified] = useState<boolean>(false);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);

    useEffect(() => (recaptchaRef.current as ReCAPTCHA).reset(), []);

    const siteKey = (): string => {
        try {
            return (window as any).Cypress ? "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" : (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string);
        } catch (e: unknown) {
            return "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
        }
    };

    const onReCAPTCHAChange = (captchaCode: unknown) => {
        if (!captchaCode) {
            return setRECAPTCHAVerified(false);
        }
        setRECAPTCHAVerified(true);
    };

    return (
        <ReCAPTCHA
            ref={recaptchaRef} //
            sitekey={siteKey()}
            onChange={onReCAPTCHAChange}
        />
    );
};

export default GoogleReCAPTCHA;
