import "../sass/globals.sass";
import "nprogress/nprogress.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Router from "next/router";
import nprogress from "nprogress";
import { useState } from "react";
import colorTheme from "@/colorTheme";
import store from "@/redux/store";
import { createWrapper } from "next-redux-wrapper";
// Types
import type { AppProps } from "next/app";
import type { Store } from "redux";
// Components
import Layout from "@/layout/Layout";
import { ThemeProvider } from "@mui/material";

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
            <Layout>
                {(() => {
                    if (loading) {
                        return <h1>Loading...</h1>;
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
