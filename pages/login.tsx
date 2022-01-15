// Tools
import joi from "joi";
import axios from "axios";
import Router from "next/router";
import { useState, useEffect } from "react";
import GuardedRoute from "@/utils/client/GuardedRoute";
// Types
import type { FunctionComponent } from "react";
import type { GetServerSideProps } from "next";
// Other components
import Image from "next/Image";
import Head from "next/Head";
import LoginHeader from "@/components/login/LoginHeader";
import CredentialsDoNotMatch from "@/components/login/CredentialsDoNotMatch";
import Redirects from "@/components/login/Redirects";
import TextInput from "@/components/register/_formFields/TextInput";
import PasswordInput from "@/components/register/_formFields/PasswordInput";
// Material UI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
// Redux
import { displaySnackbar } from "@/redux/slices/snackbar";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthentication } from "@/redux/slices/authentication";
// Styles
import styles from "@/sass/pages/register.module.sass";
import bgIMGStyles from "@/sass/large_image_as_background.module.sass";
import backgroundImage from "@/public/images/login/bgc.jpg";

const Login: FunctionComponent<{}> = () => {
    const [email, setEmail] = useState<string>("jebac_gorzen@gmail.com");
    const [password, setPassword] = useState<string>("jebac_gorzen123");
    const [blockContinue, setBlockContinue] = useState<boolean>(true);
    const [credentialsDoNotMatch, setCredentialsDoNotMatch] = useState<boolean>(false);
    const [pending, setPending] = useState<boolean>(false);
    //
    const dispatch = useAppDispatch();
    //
    // Validation
    //
    const joiScheme = joi.object({
        password: joi.string().min(6).max(255).trim(),
        email: joi.string().max(255).email({ tlds: false }),
    });
    const test = () => {
        const { error } = joiScheme.validate({ email, password });
        setBlockContinue(Boolean(error));
    };
    useEffect(test, [password, email, joiScheme]);
    //
    //
    //
    const continueClick = async () => {
        if (blockContinue) return;
        setPending(true);
        setCredentialsDoNotMatch(false);

        axios
            .post("/api/auth/login", { email, password })
            .then(() => {
                dispatch(
                    displaySnackbar({
                        msg: "You have been successfully logged in!",
                        severity: "success",
                    })
                );
                dispatch(setAuthentication(null));
                Router.back();
            })
            .catch((e) => {
                const { status } = e.toJSON();
                if (status === 401) setCredentialsDoNotMatch(true);
                else if (status === 500) {
                    dispatch(
                        displaySnackbar({
                            msg: "Unknown error has occured! ",
                            severity: "error",
                            hideAfter: 6000,
                        })
                    );
                }

                setPending(false);
            });
    };
    //
    //
    //
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>

            <Fade in={true}>
                <Box className={bgIMGStyles.background}>
                    <Image
                        className={bgIMGStyles["bg-image"]} //
                        src={backgroundImage}
                        layout="fill"
                        alt="background"
                        objectFit="cover"
                        objectPosition="center"
                        placeholder="blur"
                    ></Image>
                    <Card className={styles.formCard} sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Box className={styles["content-wrapper"]} component="form">
                            <LoginHeader pending={pending}></LoginHeader>
                            <TextInput
                                label="Email" //
                                value={email}
                                updateValue={setEmail}
                                disabled={pending}
                            ></TextInput>
                            <PasswordInput
                                label="Password" //
                                value={password}
                                updateValue={setPassword}
                                buttonStyles={{ my: 1 }}
                                disabled={pending}
                            ></PasswordInput>
                            <CredentialsDoNotMatch credentialsDoNotMatch={credentialsDoNotMatch}></CredentialsDoNotMatch>

                            <Button variant="contained" sx={{ mt: 5 }} disabled={blockContinue || pending} onClick={continueClick}>
                                Continue
                            </Button>
                        </Box>

                        <Redirects></Redirects>
                    </Card>
                </Box>
            </Fade>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = (ctx) => GuardedRoute("anonymous", ctx);

export default Login;
