// Tools
import GuardedRoute from "@/utils/client/GuardedRoute";
import useLoginRequest from "@/hooks/requests/useLoginRequest";
// Types
import type { FunctionComponent } from "react";
import type { GetServerSideProps } from "next";
// Other components
import Link from "next/link";
import Head from "next/head";
import RememberMe from "@/components/login/RememberMe";
import StyledButton from "@/components/create/_utils/forms/Button";
import InputWithIcon from "@/components/_utils/styled/InputWithIcon";
import LineIntroAnimation from "@/components/_utils/LineIntroAnimation";
// Material UI Components
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// Styled components
import BackgroundShape from "@/components/login/styled_components/BackgroundShape";
import StyledCircularProgress from "@/components/login/styled_components/StyledCircularProgress";
import StyledContentContainter from "@/components/login/styled_components/StyledContentContainter";

const Login: FunctionComponent<{}> = () => {
    const { email, password, requestIsPending, credentialsAreValid, performRequest } = useLoginRequest();

    return (
        <>
            <Head>
                <title>MES | Login</title>
            </Head>
            <BackgroundShape />
            <BackgroundShape />

            <StyledContentContainter>
                {requestIsPending && <StyledCircularProgress />}

                <div id="login-header-wrapper">
                    <LineIntroAnimation
                        in={true} //
                        intro="bottom"
                        outro="right"
                        color="paperDefault"
                        delay={400}
                    >
                        <Typography variant="h2" sx={{ mb: "10px" }}>
                            Login
                        </Typography>
                    </LineIntroAnimation>
                </div>

                <LineIntroAnimation
                    in={true} //
                    intro="left"
                    outro="bottom"
                    color="paperDefault"
                >
                    <InputWithIcon
                        value={email.value} //
                        placeholder="Email"
                        onChange={(e) => email.setValue(e.target.value)}
                        disabled={requestIsPending}
                    />
                </LineIntroAnimation>

                <LineIntroAnimation
                    in={true} //
                    intro="top"
                    outro="right"
                    color="paperDefault"
                    delay={400}
                    sx={{ mt: "10px" }}
                >
                    <InputWithIcon
                        value={password.value} //
                        placeholder="Password"
                        password
                        onChange={(e) => password.setValue(e.target.value)}
                        disabled={requestIsPending}
                    />
                </LineIntroAnimation>

                <LineIntroAnimation
                    in={true} //
                    intro="bottom"
                    outro="left"
                    color="paperDefault"
                    delay={300}
                    sx={{ mt: "10px" }}
                >
                    <RememberMe />
                </LineIntroAnimation>

                <LineIntroAnimation
                    in={true} //
                    intro="right"
                    outro="left"
                    color="paperDefault"
                    sx={{ mt: "10px" }}
                >
                    <StyledButton
                        primary //
                        id="continue- button"
                        disabled={!credentialsAreValid}
                        onClick={performRequest}
                    >
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
