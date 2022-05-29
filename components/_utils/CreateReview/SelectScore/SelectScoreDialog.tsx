// Tools
// Types
import type { FunctionComponent } from "react";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";
import { StyledDialogBase, StyledDialogTitle, StyledDialogContent, StyledDialogActions, BackgroundIcon } from "@/components/create/_utils/styled_components/Dialog";

interface SelectScoreDialogProps {
    //
}

const SelectScoreDialog: FunctionComponent<SelectScoreDialogProps> = (props) => {
    return (
        <StyledDialogBase open={true}>
            <StyledDialogTitle>Pick your score</StyledDialogTitle>
            <StyledDialogContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, possimus, impedit aut maxime praesentium omnis sapiente animi cupiditate maiores voluptas eum tenetur, a cum
                obcaecati odit natus asperiores. Eum, delectus!
            </StyledDialogContent>
            <StyledDialogActions>
                <StyledButton primary>Done</StyledButton>
            </StyledDialogActions>
        </StyledDialogBase>
    );
};

export default SelectScoreDialog;
