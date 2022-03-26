// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
// Other Components
import BottomNavigationField from "./BottomNavigationField";
import Newsletter from "./Newsletter";
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
    width: "100%",
    padding: "30px 20px",
    h3: {
        color: theme.palette.primary.main,
        fontSize: "3rem",
        margin: "60px 0 20px 0",
    },
}));

const CreatedBy = styled(FlexBox)(({ theme }) => ({
    width: "100%",
    height: "40px",
    textTransform: "uppercase",
    fontWeight: 500,
    background: theme.palette.primary.main,
    userSelect: "none",
    cursour: "pointer",
}));

const Footer: FunctionComponent = () => {
    const navigations = [
        {
            title: "Product",
            fields: [
                {
                    page: "Features",
                    url: "",
                },
                {
                    page: "Code samples",
                    url: "",
                },
                {
                    page: "Testing",
                    url: "",
                },
                {
                    page: "Documentation",
                    url: "",
                },
            ],
        },
        {
            title: "Company",
            fields: [
                {
                    page: "My portfolio",
                    url: "",
                    openInNewTab: true,
                },
                {
                    page: "My github",
                    url: "",
                    openInNewTab: true,
                },
                {
                    page: "About me",
                    url: "",
                },
                {
                    page: "Contact form",
                    url: "",
                },
            ],
        },
        {
            title: "Resources",
            fields: [
                {
                    page: "Blogs",
                    url: "",
                },
                {
                    page: "Video tutorials",
                    url: "",
                },
                {
                    page: "Case studies",
                    url: "",
                },
                {
                    page: "Sitemap",
                    url: "",
                },
            ],
        },
    ];
    return (
        <FooterWrapper component="footer" center column>
            <FooterContent column>
                <h3>My exquisite page</h3>

                <FlexBox horizontal="between">
                    <FlexBox>
                        {navigations.map((item, index) => {
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

            <CreatedBy center>
                <a href="https://github.com/DEVRafam" target="_blank" rel="noreferrer" tabIndex={0}>
                    Created by Kacper Książek 2022
                </a>
            </CreatedBy>
        </FooterWrapper>
    );
};

export default Footer;
