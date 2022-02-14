// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { LandmarkType } from "@prisma/client";
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
// Material UI Icons
import AccountBalance from "@mui/icons-material/AccountBalance";
import Star from "@mui/icons-material/Star";
// Styled Components
const Header = styled(Box)(({ theme }) => ({
    fontSize: "2.5rem",
    color: "#fff",
    position: "absolute",
    bottom: "20px",
    left: "20px",
    zIndex: 5,
    lineHeight: "50px",
    fontWeight: 900,
    letterSpacing: "2px",
    paddingRight: "20px",
    display: "flex",
    flexDirection: "column",
    "div.chips-wrapper": {
        marginBottom: "10px",
        "div.MuiChip-root": {
            marginLeft: "10px",
            background: alpha(theme.palette.background.paper, 0.5),
            "&:nth-of-type(1)": {
                marginLeft: "0",
            },
        },
    },
    "span.text": {
        height: "100px",
    },
}));
interface LandmarkHeaderProps {
    title: string;
    type: LandmarkType;
    reviews: number;
}

const LandmarkHeader: FunctionComponent<LandmarkHeaderProps> = (props) => {
    return (
        <Header>
            <div className="chips-wrapper">
                <Chip icon={<AccountBalance />} label={props.type} variant="outlined" />
                <Chip icon={<Star />} label={`${props.reviews} reviews`} variant="outlined" />
            </div>
            <span className="text">{props.title}</span>
        </Header>
    );
};

export default LandmarkHeader;
