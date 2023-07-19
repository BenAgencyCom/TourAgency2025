// Styles
import "../sass/globals.sass";
import "nprogress/nprogress.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Tools
import Router from "next/router";
import nprogress from "nprogress";
import { useState } from "react";
import colorTheme from "@/colorTheme";
import store from "@/redux/store";
import { createWrapper } from "next-redux-wrapper";
// Types
import type { AppProps } from "next/app";
// Material UI Components
import { ThemeProvider } from "@mui/material";
// Other components
import Head from "next/head";
import Layout from "@/layout/Layout";
import Loading from "@/components/_utils/Loading";
// Redux
import type { Store } from "redux";
// Styled components
interface MyAppProps extends AppProps {
    store: Store;
}
function MyApp({ Component, pageProps }: MyAppProps) {
    //
    // Handle loading panel
    //
    const [loading, setLoading] = useState<boolean>(() => false);
    Router.events.on("routeChangeStart", () => {
        setLoading(true);
        nprogress.start();
    });
    Router.events.on("routeChangeComplete", () => {
        setLoading(false);
        nprogress.done();
    });
    return (
        <ThemeProvider theme={colorTheme}>
            <Layout loading={loading}>
                {(() => {
                    if (loading) {
                        return (
                            <>
                                <Head>
                                    <title>Tour Agency site</title>
                                </Head>
                                <Loading />
                            </>
                        );
                    } else {
                        return <Component {...pageProps} />;
                    }
                })()}
            </Layout>
        </ThemeProvider>
    );
}
const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
