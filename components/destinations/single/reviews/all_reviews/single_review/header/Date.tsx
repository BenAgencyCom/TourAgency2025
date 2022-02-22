// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";

const Wrapper = styled(Box)(({ theme }) => ({
    fontSize: "1.2rem",
}));
const Colored = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

interface DateProps {
    createdAt: string; // moment(review.createdAt).format("YYYY-MM-DD HH:mm:ss")
}
const Date: FunctionComponent<DateProps> = (props) => {
    const [days, time] = props.createdAt.split(" ");

    return (
        <Wrapper component="span">
            <Colored component="span">{days}</Colored>
            <span>, at </span>
            <Colored component="span">{time}</Colored>
        </Wrapper>
    );
};

export default Date;
