import React from "react";
import type { FunctionComponent } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

interface Params {
    label: string;
    icon: React.ReactNode;
    routes: {
        label: string;
        destination: string;
    }[];
}

const DropDownMenuItem: FunctionComponent<Params> = ({ icon, label, routes }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ px: 1 }}>
            <Button onClick={handleClick} variant="outlined" sx={{ px: 2 }}>
                {icon}
                <span>{label}</span>
                <ArrowDropDown />
            </Button>
            <Menu
                anchorEl={anchorEl} //
                open={open}
                onClose={handleClose}
            >
                {routes.map((target, index) => {
                    return (
                        <div key={`${label}-${index}`}>
                            <MenuItem onClick={handleClose}>{target.label}</MenuItem>
                            {index !== routes.length - 1 && <Divider></Divider>}
                        </div>
                    );
                })}
            </Menu>
        </Box>
    );
};

export default DropDownMenuItem;
