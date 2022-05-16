// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { Destination } from "@/@types/pages/create/CreateLandmark";
// Material UI components
import Typography from "@mui/material/Typography";
// Other components
import Pictrue from "./Picture";
import LocalizationBreadCrumbs from "@/components/_utils/LocalizationBreadCrumbs";
import ButtonWithColorTransition from "@/components/_utils/styled/ButtonWithColorTransition";
// Material UI Icons
import Explore from "@mui/icons-material/Explore";
// Styled components
const SingleDestinationWrapper = styled("div")(({ theme }) => ({
    width: "calc((100% - 40px)/ 3)",
    position: "relative",
    marginLeft: "20px",
    marginBottom: "20px",
    paddingBottom: "10px",
    background: "#fff",
    "&:nth-of-type(1),&:nth-of-type(4),&:nth-of-type(7),&:nth-of-type(10),&:nth-of-type(13),&:nth-of-type(16),&:nth-of-type(19),&:nth-of-type(22),&:nth-of-type(25),&:nth-of-type(28)": {
        marginLeft: "0px",
    },
    borderRadius: "10px 10px 0 0",
    transition: "background .3s ease-in-out, color .2s ease-in-out",
    "div.content": {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0 10px",
        button: {
            fontSize: "1.2rem",
            marginTop: "10px",
        },
    },
    "&.selected": {
        color: "#fff",
        background: theme.palette.text.primary,
        "div.content": {
            "span.uncolor": {
                color: "#fff",
            },
        },
        ".icon-in-background": {
            position: "absolute",
            bottom: "0px",
            right: "0px",
            opacity: ".1",
            svg: {
                fontSize: "10rem",
            },
        },
    },
}));

interface SingleDestinationProps {
    destination: Destination;
    destinationID: StatedDataField<string | null>;
}

const SingleDestination: FunctionComponent<SingleDestinationProps> = (props) => {
    const { folder, city, country, shortDescription, id } = props.destination;
    const isSelected: boolean = props.destinationID.value === id;

    const pickThisDestination = (id: string) => {
        if (props.destinationID.value === null) document.getElementById("go-forward")?.click();
        props.destinationID.setValue(id);
    };

    return (
        <SingleDestinationWrapper
            className={isSelected ? "selected" : ""} //
            onClick={() => pickThisDestination(id)}
        >
            <Pictrue
                folder={folder} //
                city={city}
                country={country}
                resolution="360p"
            ></Pictrue>
            <div className="content">
                <LocalizationBreadCrumbs crumbs={[country, city]}></LocalizationBreadCrumbs>
                <Typography variant="h3">{city}</Typography>
                <Typography variant="body2">{shortDescription.slice(0, 100)}</Typography>
                {isSelected && (
                    <span className="icon-in-background">
                        <Explore />
                    </span>
                )}
                <ButtonWithColorTransition reverse primary>
                    Select
                </ButtonWithColorTransition>
            </div>
        </SingleDestinationWrapper>
    );
};

export default SingleDestination;
