// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";

const Wrapper = styled("span")(({ theme }) => ({
    fontSize: "1.2rem",
}));
const Colored = styled("span")(({ theme }) => ({
    color: theme.palette.primary.main,
}));

interface DateProps {
    createdAt: string; // moment(review.createdAt).format("YYYY-MM-DD HH:mm:ss")
}
const Date: FunctionComponent<DateProps> = (props) => {
    const [days, time] = props.createdAt.split(" ");

    return (
        <Wrapper>
            <Colored>{days}</Colored>
            <span>, at </span>
            <Colored>{time}</Colored>
        </Wrapper>
    );
};

export default Date;
