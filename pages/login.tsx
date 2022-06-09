// Tools
import joi from "joi";
import axios from "axios";
import Router from "next/router";
import { alpha, styled } from "@mui/system";
import { useState, useEffect } from "react";
import GuardedRoute from "@/utils/client/GuardedRoute";
import { lineIntroFromLeft } from "@/components/_utils/styled/keyframes";
// Types
import type { FunctionComponent } from "react";
import type { GetServerSideProps } from "next";
// Other components
import Link from "next/link";
import Head from "next/Head";
import RememberMe from "@/components/login/RememberMe";
import StyledButton from "@/components/create/_utils/forms/Button";
import InputWithIcon from "@/components/_utils/styled/InputWithIcon";
import LineIntroAnimation from "@/components/login/LineIntroAnimation";
import CredentialsDoNotMatch from "@/components/login/CredentialsDoNotMatch";
// Material UI Components
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// Redux
import { displaySnackbar } from "@/redux/slices/snackbar";
import { useAppDispatch } from "@/hooks/useRedux";
import { setAuthentication } from "@/redux/slices/authentication";
import styles from "@/sass/pages/register.module.sass";
import bgIMGStyles from "@/sass/large_image_as_background.module.sass";
// Styled components
import BackgroundShape from "@/components/login/BackgroundShape";

const StyledContentContainter = styled("div")(({ theme }) => ({
    left: "50%",
    top: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    maxHeight: "500px",
    width: "100vw",
    maxWidth: "550px",
    padding: "10px 20px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.palette.text.primary,
    ["@media (min-width: 800px)"]: {
        background: "#fff",
        marginTop: "5vh",
        height: "100vh",
    },
    h2: {
        userSelect: "none",
        marginBottom: "20px",
        flexGrow: 1,
        display: "flex",
        alignItems: "flex-end",
    },
    ".MuiInputBase-root": {
        width: "400px",
        maxWidth: "calc(100vw - 20px)",
    },
    "#continue-button": {
        height: "40px",
        width: "250px",
        maxWidth: "calc(100vw - 20px)",
        marginBottom: "10px",
        position: "relative",
    },
    "span.navigation": {
        padding: "5px 10px",
        marginTop: "5px",
        borderRadius: "3px",
        cursor: "pointer",
        transition: "background .3s ease-in-out",
        "&:nth-of-type(1)": {
            marginTop: "0",
        },
        "&:hover": {
            background: alpha(theme.palette.primary.main, 0.2),
        },
    },
}));

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
                Router.push("/");
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
            <BackgroundShape />
            <BackgroundShape />

            <StyledContentContainter>
                <Typography variant="h2">Login</Typography>

                <LineIntroAnimation
                    in={true} //
                    intro="left"
                    outro="bottom"
                    color="paperDefault"
                >
                    <InputWithIcon
                        value={email} //
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </LineIntroAnimation>

                <LineIntroAnimation
                    in={true} //
                    intro="top"
                    outro="right"
                    color="paperDefault"
                    delay={600}
                    sx={{ mt: "10px" }}
                >
                    <InputWithIcon
                        value={password} //
                        placeholder="Password"
                        password
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </LineIntroAnimation>

                <LineIntroAnimation
                    in={true} //
                    intro="bottom"
                    outro="left"
                    color="paperDefault"
                    delay={600}
                >
                    <RememberMe />
                </LineIntroAnimation>

                <LineIntroAnimation
                    in={true} //
                    intro="right"
                    outro="left"
                    color="paperDefault"
                >
                    <StyledButton primary id="continue-button">
                        Continue
                    </StyledButton>
                </LineIntroAnimation>

                <Divider flexItem sx={{ my: "10px" }} />

                <Link href="/register" passHref>
                    <span className="navigation">Create an account</span>
                </Link>
            </StyledContentContainter>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = (ctx) => GuardedRoute("anonymous", ctx);

export default Login;
