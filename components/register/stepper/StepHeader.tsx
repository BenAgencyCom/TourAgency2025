import type { FunctionComponent, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import styles from "@/sass/mixins.module.sass";

interface StepHeaderParams {
    header: string;
    icon: ReactNode;
}
const StepHeader: FunctionComponent<StepHeaderParams> = (props) => {
    return (
        <Typography
            variant="h1"
            sx={{
                color: "text.primary", //
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: "bold",
            }}
            className={styles.unselectable}
        >
            <Typography>{props.icon}</Typography>
            <span>{props.header}</span>
        </Typography>
    );
};

export default StepHeader;
