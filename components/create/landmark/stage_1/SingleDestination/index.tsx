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
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { displaySnackbar } from "@/redux/slices/snackbar";
// Styled components
const SingleDestinationWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    marginLeft: "20px",
    marginBottom: "20px",
    paddingBottom: "10px",
    background: "#fff",
    borderRadius: "10px 10px 0 0",
    transition: "background .3s ease-in-out, color .2s ease-in-out",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    "div.content": {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0 10px",
        button: {
            fontSize: "1.1rem",
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
    selectedDestination: StatedDataField<Destination | null>;
}

const SingleDestination: FunctionComponent<SingleDestinationProps> = (props) => {
    const dispatch = useAppDispatch();

    const { folder, city, country, shortDescription, id } = props.destination;
    const isSelected: boolean = props.selectedDestination.value?.id === id;

    const pickThisDestination = () => {
        if (props.selectedDestination.value === null) setTimeout(() => document.getElementById("go-forward")?.click(), 10);
        props.selectedDestination.setValue(props.destination);

        dispatch(
            displaySnackbar({
                msg: `${props.destination.city} has been selected`,
                severity: "success",
                hideAfter: 2000,
            })
        );
    };

    return (
        <SingleDestinationWrapper
            className={[
                isSelected ? "selected" : "", //
                "single-destination",
            ].join(" ")} //
        >
            <Pictrue
                folder={folder} //
                city={city}
                country={country}
                resolution="360p"
            ></Pictrue>
            <div className="content">
                <LocalizationBreadCrumbs crumbs={[country, city]}></LocalizationBreadCrumbs>
                <Typography variant="h3" sx={{ m: "0" }}>
                    {city}
                </Typography>
                <Typography variant="body2">{shortDescription.slice(0, 100)}</Typography>
                {isSelected && (
                    <span className="icon-in-background">
                        <Explore />
                    </span>
                )}
                <ButtonWithColorTransition
                    reverse //
                    primary
                    onClick={pickThisDestination}
                >
                    {isSelected ? "Selected" : "Select"}
                </ButtonWithColorTransition>
            </div>
        </SingleDestinationWrapper>
    );
};

export default SingleDestination;
