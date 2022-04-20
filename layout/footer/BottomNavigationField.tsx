// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Other components
import Link from "next/link";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Field = styled(FlexBox)(({ theme }) => ({
    marginRight: "150px",
    h5: {
        color: "#fff",
        fontWeight: 500,
        fontSize: "1.5rem",
        letterSpacing: "-1px",
        margin: 0,
    },
    ul: {
        padding: "0 0 0 20px",
        margin: 0,
        listStyleType: "none",
        li: {
            color: alpha("#fff", 0.7),
            marginTop: 7,
            "&:hover": {
                color: alpha("#fff", 0.9),
                cursor: "pointer",
            },
        },
    },
}));

interface BottomNavigationFieldProps {
    title: String;
    fields: {
        page: string;
        url: string;
        openInNewTab?: boolean;
    }[];
}
const BottomNavigationField: FunctionComponent<BottomNavigationFieldProps> = (props) => {
    return (
        <Field column className="footer-navigation-field">
            <h5>{props.title}</h5>
            <ul>
                {props.fields.map((item, index) => {
                    return (
                        <li key={index}>
                            {(() => {
                                if (item.url) {
                                    return (
                                        <Link href={item.url} passHref>
                                            {item.page}
                                        </Link>
                                    );
                                } else return <span>{item.page}</span>;
                            })()}
                        </li>
                    );
                })}
            </ul>
        </Field>
    );
};

export default BottomNavigationField;
