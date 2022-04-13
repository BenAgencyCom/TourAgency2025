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
    width: "100%",
    padding: "30px 20px",
    h3: {
        color: theme.palette.primary.main,
        fontSize: "3rem",
        margin: "60px 0 20px 0",
    },
}));

const Footer: FunctionComponent = () => {
    return (
        <FooterWrapper center column>
            <FooterContent column>
                <Header></Header>

                <FlexBox horizontal="between">
                    <FlexBox>
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

export default Footer;
