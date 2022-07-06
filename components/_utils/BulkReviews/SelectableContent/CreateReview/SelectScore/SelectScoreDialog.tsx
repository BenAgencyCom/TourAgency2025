// Tools
import { styled } from "@mui/system";
import { useState } from "react";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Divider from "@mui/material/Divider";
// Styled components
import OptionsRow from "./OptionsRow";
import StyledButton from "@/components/create/_utils/forms/Button";
import { StyledDialogBase, StyledDialogTitle, StyledDialogContent, StyledDialogActions, BackgroundIcon } from "@/components/create/_utils/styled_components/Dialog";

const StyledReviewScore = styled("div")(({ theme }) => ({
    width: "140px",
    height: "120px",
    fontSize: "4.5rem",
    marginRight: "10px",
    fontWeight: "700",
    marginBottom: "10px",
    transition: "background .3s ease-in-out",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    span: {
        transition: "color .3s ease-in-out",
    },
    "span.hide": {
        color: theme.palette.text.primary,
    },
}));

interface SelectScoreDialogProps {
    estimatedReviewColor: string;
    open: StatedDataField<boolean>;
    scoreInt: StatedDataField<number>;
    scoreFloat: StatedDataField<number>;
}

const SelectScoreDialog: FunctionComponent<SelectScoreDialogProps> = (props) => {
    const { scoreInt, scoreFloat } = props;
    const [activeStage, setActiveStage] = useState<"scoreInt" | "scoreFloat">("scoreInt");

    return (
        <StyledDialogBase open={props.open.value}>
            <StyledDialogTitle>Pick your score</StyledDialogTitle>
            <StyledDialogContent sx={{ minHeight: "420px" }}>
                <StyledReviewScore sx={{ background: props.estimatedReviewColor }}>
                    {(() => {
                        if (scoreInt.value === 10) {
                            return 10;
                        } else {
                            return (
                                <>
                                    <span className={activeStage !== "scoreInt" ? "hide" : ""}>{scoreInt.value}</span>
                                    <span>.</span>
                                    <span className={activeStage !== "scoreFloat" ? "hide" : ""}>{scoreFloat.value}</span>
                                </>
                            );
                        }
                    })()}
                </StyledReviewScore>
                <Divider flexItem sx={{ my: "20px" }} />

                {(() => {
                    if (activeStage === "scoreInt") {
                        return (
                            <OptionsRow
                                range={{ start: 0, end: 10 }} //
                                value={scoreInt}
                                estimatedReviewColor={props.estimatedReviewColor}
                            ></OptionsRow>
                        );
                    } else {
                        return (
                            <OptionsRow
                                range={{ start: 0, end: 9 }} //
                                value={scoreFloat}
                                disabled={scoreInt.value === 10}
                                estimatedReviewColor={props.estimatedReviewColor}
                            ></OptionsRow>
                        );
                    }
                })()}
            </StyledDialogContent>

            <StyledDialogActions sx={{ justifyContent: "center", paddingLeft: "0" }}>
                <StyledButton
                    onClick={() =>
                        setActiveStage((val) => {
                            if (val === "scoreInt") return "scoreFloat";
                            return "scoreInt";
                        })
                    }
                    disabled={scoreInt.value === 10}
                    sx={{ width: "160px" }}
                >
                    {activeStage === "scoreInt" ? "Continue" : "Go back"}
                </StyledButton>
                <StyledButton primary onClick={() => props.open.setValue(false)}>
                    Done
                </StyledButton>
            </StyledDialogActions>
        </StyledDialogBase>
    );
};

export default SelectScoreDialog;
