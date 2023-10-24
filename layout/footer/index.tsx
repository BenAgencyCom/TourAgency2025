// Data
import navigation from "./navigation";
// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Divider from "@mui/material/Divider";
// Other Components
import BottomNavigationField from "./BottomNavigationField";
import Newsletter from "./Newsletter";
import CreatedBy from "./CreatedBy";
import Header from "./Header";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const FooterWrapper = styled(FlexBox)(({ theme }) => ({
    position: "relative",
    zIndex: 1,
    width: "100%",
    cursor: "default",
    background: theme.palette.text.primary,
    hr: {
        borderColor: "#fff !important",
        margin: "40px 0",
    },
}));
const FooterContent = styled(FlexBox)(({ theme }) => ({
    maxWidth: "1450px",
    width: "calc(100vw - 100px)",
    padding: "30px 0px",
    h3: {
        color: theme.palette.primary.main,
        fontSize: "2.5rem",
        margin: "60px 0 20px 0",
    },
    ["@media (max-width: 1300px)"]: {
        ".footer-navigation-field": {
            marginRight: "100px",
        },
    },
    ["@media (max-width:1200px)"]: {
        width: "calc(100vw - 40px)",
        ".footer-header": {
            textAlign: "center",
            ".bigger-header": {
                width: "100%",
                textAlign: "center",
                transfrom: "none",
            },
        },
        ".main-footer-content-wrapper": {
            flexDirection: "column",
            alignItems: "center",
            ".newsletter": {
                alignItems: "center",
                marginTop: "50px",
            },
        },
        ".footer-navigation-fields-wrapper": {
            width: "100%",
            maxWidth: "700px",
            justifyContent: "space-evenly",
            ".footer-navigation-field": {
                marginRight: "0",
                width: "30%",
                textAlign: "center",
                ul: {
                    padding: 0,
                },
                h5: {
                    fontSize: "2rem",
                    marginBottom: "10px",
                },
            },
        },
        ".social-media-btn": {
            marginTop: "50px",
            width: "50px",
            height: "50px",
            svg: {
                fontSize: "2rem",
            },
        },
    },
    ["@media (max-width: 700px)"]: {
        width: "calc(100vw - 20px)",
        ".footer-header": {
            h3: {
                fontSize: "2.5rem",
            },
            ".bigger-header": {
                fontSize: "6rem",
            },
        },
    },
    ["@media (max-width: 650px)"]: {
        ".footer-navigation-fields-wrapper": {
            flexDirection: "column",
            ".footer-navigation-field": {
                width: "100%",
                marginTop: "20px",
                "&:nth-of-type(1)": {
                    marginTop: "0px",
                },
            },
        },
    },
    ["@media (max-width: 550px)"]: {
        ".footer-header": {
            ".bigger-header": {
                fontSize: "5rem",
            },
        },
    },
    ["@media (max-width: 450px)"]: {
        ".footer-header": {
            h3: {
                fontSize: "2.2rem",
            },
        },
        ".newsletter-icon-wrapper": {
            flexDirection: "column",
            h4: {
                textAlign: "center",
            },
            svg: {
                marginLeft: "0",
                marginBottom: "20px",
                fontSize: "6rem",
            },
        },
        ".newsletter-input-wrapper": {
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 0,
            input: {
                width: "100%",
            },
            button: {
                marginTop: "20px",
                width: "200px",
                borderRadius: "5px",
                height: "40px",
                fontSize: "1.4rem",
            },
        },
    },
}));

const LayoutFooter: FunctionComponent = () => {
    return (
        <FooterWrapper center column>
            <FooterContent column>
                <Header></Header>
                <FlexBox horizontal="between" className="main-footer-content-wrapper">
                    <FlexBox className="footer-navigation-fields-wrapper">
                        {navigation.map((item, index) => {
                            return (
                                <BottomNavigationField
                                    key={index} //
                                    title={item.title}
                                    fields={item.fields}
                                ></BottomNavigationField>
                            );
                        })}
                    </FlexBox>

                    <Newsletter></Newsletter>
                </FlexBox>

                <Divider></Divider>
            </FooterContent>

            <CreatedBy></CreatedBy>
        </FooterWrapper>
    );
};

export default LayoutFooter;
