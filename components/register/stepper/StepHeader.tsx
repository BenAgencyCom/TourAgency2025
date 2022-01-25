import type { FunctionComponent, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import mixins from "@/sass/mixins.module.sass";
import styles from "@/sass/pages/register.module.sass";

interface StepHeaderParams {
    header: string;
    icon?: ReactNode;
}
const StepHeader: FunctionComponent<StepHeaderParams> = (props) => {
    return (
        <Typography
            variant="h2"
            sx={{
                color: "text.primary", //
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: "bold",
                mb: 4,
            }}
            className={mixins.unselectable}
        >
            <Typography>{props.icon}</Typography>
            <span className={styles.title} data-cy="register-step">
                {props.header}
            </span>
        </Typography>
    );
};

export default StepHeader;
