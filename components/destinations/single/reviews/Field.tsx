// Tools
import { styled } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent, ReactNode } from "react";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const FieldWrapper = styled(FlexBox)(({ theme }) => ({
    width: "100%",
    borderRadius: 10,
    boxSizing: "border-box",
}));
interface FieldProps {
    children: ReactNode;
    className?: string;
    sx?: SxProps;
}

const Field: FunctionComponent<FieldProps> = ({ children, ...propsToForward }) => {
    return (
        <FieldWrapper column center {...propsToForward}>
            {children}
        </FieldWrapper>
    );
};

export default Field;
