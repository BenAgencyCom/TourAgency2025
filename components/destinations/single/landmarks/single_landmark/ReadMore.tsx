// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Button from "@mui/material/Button";
// Other Components
import Link from "next/link";
interface ReadMoreProps {
    slug: string;
}
const ReadMoreButton = styled(Button)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 10,
    transition: "opacity .3s",
    opacity: 0,
    color: "#fff",
    padding: "10px 50px",
    letterSpacing: "2px",
}));
const ReadMore: FunctionComponent<ReadMoreProps> = (props) => {
    return (
        <Link passHref href={`/landmarks/${props.slug}`}>
            <ReadMoreButton
                variant="contained" //
                className="read-more"
            >
                Read more
            </ReadMoreButton>
        </Link>
    );
};

export default ReadMore;
