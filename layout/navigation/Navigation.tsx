import type { FunctionComponent } from "react";
import { Home, LocalOffer, EmojiEvents } from "@mui/icons-material";
import DropDownMenuItem from "./DropDownMenuItem";
import Box from "@mui/material/Box";

const Navigation: FunctionComponent = () => {
    return (
        <Box
            sx={{
                display: "flex", //
                alignItems: "center",
                justifyContent: "space-between",
                p: 1,
                mr: 2,
            }}
        >
            <DropDownMenuItem
                label="Home"
                icon={<Home sx={{ mr: 1 }}></Home>}
                routes={[
                    { label: "Lorem ipsum", destination: "Essa" },
                    { label: "Ipsum", destination: "Essa" },
                    { label: "Dolor", destination: "Essa" },
                ]}
            ></DropDownMenuItem>{" "}
            <DropDownMenuItem
                label="Offer"
                icon={<LocalOffer sx={{ mr: 1 }}></LocalOffer>}
                routes={[
                    { label: "Lorem ipsum", destination: "Essa" },
                    { label: "Ipsum", destination: "Essa" },
                    { label: "Dolor", destination: "Essa" },
                    { label: "Dolor", destination: "Essa" },
                ]}
            ></DropDownMenuItem>{" "}
            <DropDownMenuItem
                label="Experience"
                icon={<EmojiEvents sx={{ mr: 1 }}></EmojiEvents>}
                routes={[
                    { label: "Lorem ipsum", destination: "Essa" },
                    { label: "Ipsum", destination: "Essa" },
                    { label: "Dolor", destination: "Essa" },
                ]}
            ></DropDownMenuItem>
        </Box>
    );
};

export default Navigation;
