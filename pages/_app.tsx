import "../sass/globals.sass";
import "nprogress/nprogress.css";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Router from "next/router";
import nprogress from "nprogress";
import { useState } from "react";
import colorTheme from "@/colorTheme";

import type { AppProps } from "next/app";
import Layout from "@/layout/Layout";
import { ThemeProvider } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
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

export default MyApp;
