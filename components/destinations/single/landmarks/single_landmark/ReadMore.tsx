// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Material UI Icons
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
// Other Components
import Link from "next/link";
// Styled Components
const ReadMoreButton = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "46%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
    transition: "opacity .3s",
    opacity: 0,
    color: "#fff",
    width: "300px",
    padding: "10px 50px",
    letterSpacing: "2px",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    span: {
        fontWeight: "bold",
        fontSize: "2rem",
        textTransform: "uppercase",
    },
    svg: {
        position: "absolute",
        fontSize: "6rem",
        transform: "translateX(-50%)",
        left: "50%",
        top: 20,
    },
}));
interface ReadMoreProps {
    slug: string;
}
const ReadMore: FunctionComponent<ReadMoreProps> = (props) => {
    return (
        <Link passHref href={`/landmarks/${props.slug}`}>
            <ReadMoreButton className="read-more" color="inherit">
                <span>Read more</span>
                <ArrowRightAlt></ArrowRightAlt>
            </ReadMoreButton>
        </Link>
    );
};

export default ReadMore;
