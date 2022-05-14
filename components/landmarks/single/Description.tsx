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
    description: DescriptionContentField[];
    folder: string;
}

const SingleLandmarkDescription: FunctionComponent<DescriptionProps> = (props) => {
    const { description, folder } = props;
    const imageLoader = (url: string): string => `/upload/landmarks/${folder}/description/${url}/1080p.jpg`;

    return (
        <Section
            id="description-wrapper"
            background={colorTheme.palette.background.default}
            mobileIcon={<MenuBook></MenuBook>}
            header={{
                text: "WORDS OF INTRODUCTION", //
                biggerHeader: "About",
            }}
        >
            <Description
                data={description} //
                imageLoader={imageLoader}
            ></Description>
        </Section>
    );
};

export default SingleLandmarkDescription;
