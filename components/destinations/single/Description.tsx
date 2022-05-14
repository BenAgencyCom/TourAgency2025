// Tools
import colorTheme from "@/colorTheme";
// Types
import type { FunctionComponent } from "react";
import type { DescriptionContentField } from "@/@types/Description";
// Other components
import Section from "@/components/_utils/Section";
import Description from "@/components/_utils/Description";
// Material UI Icons
import MenuBook from "@mui/icons-material/MenuBook";

interface DescriptionProps {
    folder: string;
    description: DescriptionContentField[];
}

const DestinationWrapper: FunctionComponent<DescriptionProps> = (props) => {
    return (
        <Section
            id="description"
            background={colorTheme.palette.background.default}
            mobileIcon={<MenuBook></MenuBook>}
            header={{
                text: "WORDS OF INTRODUCTION", //
                biggerHeader: "About",
            }}
        >
            <Description
                data={props.description} //
                imageLoader={(url: string): string => `/upload/destinations/${props.folder}/description/${url}/1080p.jpg`}
            ></Description>
        </Section>
    );
};

export default DestinationWrapper;
