// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { HeaderContentField } from "@/@types/DestinationDescription";
// Material UI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Divider = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "1px",
    background: theme.palette.primary.main,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

interface HeaderContentFieldProps {
    data: HeaderContentField;
}

const HeaderField: FunctionComponent<HeaderContentFieldProps> = (props) => {
    return (
        <>
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 5 }}>
                {props.data.header}
            </Typography>
            <Divider></Divider>
        </>
    );
};

export default HeaderField;
