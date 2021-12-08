import { FunctionComponent, useState } from "react";
import type { CountryType } from "@/data/countries";
// My components
import Stepper from "@/components/register/stepper/Stepper";
// Sections
import PersonalData from "@/components/register/PersonalData";
import Credentials from "@/components/register/Credentials";
import AvatarAndBackground from "@/components/register/AvatarAndBackground";
// Material UI components
import Box from "@mui/material/Box";

import styles from "@/sass/mixins.module.sass";

const Registration: FunctionComponent<{}> = () => {
    // Form Data
    // const [name, setName] = useState<string>("");
    // const [surname, setSurname] = useState<string>("");
    // const [email, setEmail] = useState<string>("");
    // const [country, setCountry] = useState<CountryType | null>(null);
    // const [sex, setSex] = useState<"Male" | "Female" | "Other">("Male");
    // const [born, setBorn] = useState<Date | null>(null);
    // const [password, setPassword] = useState<string>("");
    // const [passwordRepeatation, setPasswordRepeatation] = useState<string>("");
    // MOCKED
    const [name, setName] = useState<string>("Kacper");
    const [surname, setSurname] = useState<string>("Ksiazek");
    const [email, setEmail] = useState<string>("jebac_gorzen@gmail.com");
    const [country, setCountry] = useState<CountryType | null>({ code: "PL", label: "Poland", phone: "48" });
    const [sex, setSex] = useState<"Male" | "Female" | "Other">("Male");
    const [born, setBorn] = useState<Date | null>(new Date());
    // ORIGINAL
    const [password, setPassword] = useState<string>("jebac_gorzen123");
    const [passwordRepeatation, setPasswordRepeatation] = useState<string>("jebac_gorzen123");
    // Auxiliary
    const buttonStyles = { my: 1 };
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
    //
    return (
        <Box className={styles.absoluteCenter} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Stepper currentSlideIndex={currentSlideIndex}></Stepper>

            {(() => {
                switch (currentSlideIndex) {
                    case 0:
                        return (
                            <PersonalData
                                // Data
                                name={{ value: name, setValue: setName }}
                                surname={{ value: surname, setValue: setSurname }}
                                sex={{ value: sex, setValue: setSex }}
                                born={{ value: born, setValue: setBorn }}
                                country={{ value: country, setValue: setCountry }}
                                //
                                buttonStyles={buttonStyles}
                                currentSlideIndex={currentSlideIndex}
                                updateSlideIndex={setCurrentSlideIndex}
                            ></PersonalData>
                        );
                    case 1:
                        return (
                            <Credentials
                                // Data
                                password={{ value: password, setValue: setPassword }}
                                passwordRepeatation={{ value: passwordRepeatation, setValue: setPasswordRepeatation }}
                                email={{ value: email, setValue: setEmail }}
                                //
                                buttonStyles={buttonStyles}
                                currentSlideIndex={currentSlideIndex}
                                updateSlideIndex={setCurrentSlideIndex}
                            ></Credentials>
                        );
                }
            })()}
        </Box>
    );
};

export default Registration;
