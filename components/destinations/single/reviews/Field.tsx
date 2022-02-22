// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
const FieldWrapper = styled(FlexBox)(({ theme }) => ({
    height: "calc(50% - 10px)",
    width: "100%",
}));
interface FieldProps {
    children: ReactNode;
}

const Field: FunctionComponent<FieldProps> = (props) => {
    return (
        <FieldWrapper column center>
            {props.children}
        </FieldWrapper>
    );
};

export default Field;
